let mongoose = require('mongoose');

mongoose.Promise = global.Promise;





var connectPath, options;
//Check if we are on Heroku
if (process.env.PORT) {
    connectPath = "mongodb://Ankit6564@ds121999.mlab.com:21999/node_todo_api";
    options = {
        auth: {
            user: 'Ankit6564',
            password: 'gokuwillbeatjiren'
        }
    }
} else {
    connectPath = "mongodb://localhost:27017/TodoApp";
    options = {}
}
mongoose.connect(connectPath, options);
module.exports = { mongoose };