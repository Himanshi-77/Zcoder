// ✅ Load environment variables before anything else
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const connect = require('./config/database');
const authMiddleware = require('./middleware/auth');

// Routers & pages
const roomRouter   = require('./routes/roomRoute');
const homeRouter   = require('./routes/homeRoute');
const msgRouter    = require('./routes/msgRoute');
const problemPage  = require('./pages/problem/problem');
const homePage     = require('./pages/home/home');
const loginPage    = require('./pages/login/login');
const signupPage   = require('./pages/signup/signup');

const app  = express();
const port = process.env.PORT || 10000;

// ——— Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ——— Session setup
app.use(session({
  secret: process.env.TOKEN_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// ——— CORS setup
const LOCAL_ORIGIN     = 'http://localhost:3000';
const FRONTEND_ORIGIN  = process.env.FRONTEND_URL;         // e.g. https://zcoder-gamma.vercel.app
const allowedOrigins   = (process.env.NODE_ENV === 'production' && FRONTEND_ORIGIN)
  ? [FRONTEND_ORIGIN]
  : [LOCAL_ORIGIN];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET','POST','PUT','DELETE']
}));

// ——— Passport init
app.use(passport.initialize());
app.use(passport.session());

// ——— API routes
app.use('/api/room',    roomRouter);
app.use('/api/home',    homeRouter);
app.use('/api/msg',     msgRouter);
app.use('/api/problem', problemPage);

// ——— Page handlers
app.use(homePage.app);
app.use(loginPage.app);
app.use(signupPage.app);

// ——— Auth-check endpoint
app.get('/api/getAuth', authMiddleware, (req, res) => {
  if (req.user) {
    return res.status(200).json(req.user);
  }
  return res.status(401).json({ message: 'You need to log in first.' });
});

// ——— Connect to Mongo
connect();

// ——— Start server
const server = createServer(app);
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// ——— Socket.IO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE']
  }
});

io.on('connection', socket => {
  socket.on('joinRoom', room => {
    socket.join(room);
    socket.to(room).emit('welcomeMsg', `${socket.id} has entered the chat`);
  });

  socket.on('newmessage', ({ msg, id }) => {
    socket.to(id).emit('getmessage', msg);
  });
});
