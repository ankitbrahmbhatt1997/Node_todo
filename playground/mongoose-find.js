
const { User } = require('./../server/models/users');
const { Todo } = require('./../server/models/todos');
const { mongoose } = require('./../server/DB/mongoose');
const { ObjectId } = require('mongodb');

// let id = "57ab46a2029d5d102dc89ee31";
// Todo.find({
//     _id: id
// }).then((docs) => {
//     console.log(docs)
// });

// Todo.findOne({
//     _id: id
// }).then((doc) => {
//     if (!doc) {
//         return console.log("Fuck off");
//     }
//     console.log(doc)
// }, (e) => {
//     console.log(e);
// });
User.findById("5ab3ca3fb2fb991e4036c892").then((doc) => {
    if (!doc) {
        return console.log("Not found");
    }
    console.log(doc);
}, (e) => {
    console.log(e);
})
