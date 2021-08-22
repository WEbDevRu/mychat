const mongoose = require('mongoose');

const RECONNECT_TIMEOUT = 15000;

mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

async function connectMongoose() {
    await mongoose.connect(process.env.MONGO_URL, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    const { connection } = mongoose;
    return connection;
}

mongoose.connection.on('error', (err) => {
    setTimeout(connectMongoose, RECONNECT_TIMEOUT);
});

exports.connectMongoose = connectMongoose;
