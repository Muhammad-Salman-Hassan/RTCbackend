const mongoose = require('mongoose');
function dbConnection() {


    mongoose.connect("mongodb://localhost:27017/talk", { useUnifiedTopology: true, useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        // we're connected!
        console.log("DB Connected")
    });

}

module.exports = dbConnection