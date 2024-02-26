const mongoose = require('mongoose');
const URI = "mongodb://127.0.0.1:27017/mern_admin";
// const URI = "mongodb+srv://raghavbundela9211:00000000@cluster0.zzjooph.mongodb.net/?retryWrites=true&w=majority/mern_admin";


const connectDb = async()=>{
    try {
        await mongoose.connect(URI);
        console.log("connected to database successfully");
        
    } catch (error) {
        console.log("Connection not established");
        process.exit(0);
        
    }
}
module.exports= connectDb ;