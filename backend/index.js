// ✅ Load environment variables before anything else
require('dotenv').config();

const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const port = process.env.PORT || 10000;

const connect = require('./config/database');
const auth = require('./middleware/auth');
// const userRouter = require('./routes/userRoute');
const roomRouter = require('./routes/roomRoute');
const homeRouter = require('./routes/homeRoute');
const msgRouter = require('./routes/msgRoute');
const signup = require('./pages/signup/signup');
const login = require('./pages/login/login');
const home = require('./pages/home/home');
const passport = require('passport');
const session = require('express-session');
const middleware = require('./middleware/auth');
const profile = require('./pages/profile/profile');
const ask = require('./pages/problem/problem');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(cors({
    origin: ['http://localhost:3000', 'https://zcoder-liard.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/home', homeRouter);
app.use('/api/problem', ask);
app.use('/api/msg', msgRouter);

app.use(passport.initialize());
app.use(passport.session());
// app.use(profile.app);
app.use(home.app);

app.use(login.app);
app.use(signup.app);

app.get('/api/getAuth', middleware, (req, res) => {
    if (req.user) {
        return res.status(200).json(req.user);
    } else {
        return res.status(400).send('You need to login first!');
    }
});

// ✅ Connect to MongoDB after env is loaded
connect();

const server = createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://zcoder-kappa.vercel.app'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
});

io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
        socket.to(room).emit('welcomeMsg', `${socket.id} has entered the chat`);
    });

    socket.on('newmessage', ({ msg, id }) => {
        socket.to(id).emit('getmessage', msg);
    });

    socket.on('disconnect', () => {
        // Handle cleanup here if needed
    });
});
