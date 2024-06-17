
const mongoose = require('mongoose');
const uri = "mongodb+srv://muxujiu:6bWIQNGeXzTQXCUG@cluster9.yxn4zv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster9";

mongoose.connect(uri)
var db = mongoose.connection;
db.on('error', function callback() {
    console.log("Connection error");
});

db.once('open', function callback() {
    console.log("Mongo working!");
    console.info("当前时间"+new Date());
});