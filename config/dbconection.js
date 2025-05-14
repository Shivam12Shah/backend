const mongoose = require("mongoose")

module.exports.dbconnection = ()=>{
    try {
        mongoose.connect(process.env.MONGOURL) 
        console.log("Database connected ");
    } catch (error) {
        console.log("theier is some error while connected to database");
        
    }
}