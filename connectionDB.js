const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://adeel555:adeel555@cluster0-shard-00-00.lc2pv.mongodb.net:27017,cluster0-shard-00-01.lc2pv.mongodb.net:27017,cluster0-shard-00-02.lc2pv.mongodb.net:27017/blogPosts?ssl=true&replicaSet=atlas-o3xb6j-shard-0&authSource=admin&retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        })
        console.log('mongo db Connection established');
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}
module.exports = connectDB;
