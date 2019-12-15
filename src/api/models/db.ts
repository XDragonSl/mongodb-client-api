import mongoose = require('mongoose');

function DBConnect(uri: string, callback: any) {
    let connection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    connection.on('connected', () => {
        callback(connection);
    });
}

export default DBConnect;
