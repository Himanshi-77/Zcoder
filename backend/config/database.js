const mongoose=require('mongoose')
const connect = async ()=>{
    try {
        console.log('Connecting to database')
        console.log("🚨 MONGO_URI being used:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('Database connected');
        }).catch((err)=>{
            console.log('Database connection error');
            console.log(err);
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = connect;