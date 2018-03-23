let express = require('express');
let bodyParser = require('body-parser');



let { mongoose } = require('./DB/mongoose');
let { Todo } = require('./models/todos');
let { User } = require('./models/users');
console.log(typeof Todo);

let app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    let todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    })

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })

})
app.get("/todos", (req, res) => {
    Todo.find().then((docs) => {
        res.send({ docs })
    }, (e) => {
        res.status(400).send(e);
    })
})

app.listen(3000, () => {
    console.log("Server Started")
});
