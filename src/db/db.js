const mongoose = require("mongoose");

async function connectDb(){
await mongoose.connect("mongodb+srv://shreyans-backend:jVu_DiFiui4Jjav@shreyans-backend.thodvp7.mongodb.net/notes");
console.log("Connected to database");
}

module.exports = connectDb;