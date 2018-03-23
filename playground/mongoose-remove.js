let { ObjectId } = require('mongodb');


let { mongoose } = require('./../server/DB/mongoose');
let { Todo } = require('./../server/models/todos');
let { User } = require('./../server/models/users');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findByIdAndRemove("5ab4ae791d1a22997654deb8").then((todo) => {
    console.log(todo);
})
