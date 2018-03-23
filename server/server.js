let express = require('express');
let bodyParser = require('body-parser');
let { ObjectId } = require('mongodb');
let lodash = require('lodash');

let { mongoose } = require('./DB/mongoose');
let { Todo } = require('./models/todos');
let { User } = require('./models/users');
console.log(typeof Todo);

let port = process.env.PORT || 3000;
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
app.get('/todos/:id', (req, res) => {
    let id = req.params;

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }
    Todo.findById(id).then((doc) => {
        if (!doc) {
            res.status(404).send();
        }
        res.send(doc);
    }, (e) => { res.status(400).send() })
}
)

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((docs) => {
        if (!docs) {
            return res.status(404).send();
        }
        res.send(docs);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.patch('/todos/:id', (req, res) => {

    let id = req.params.id;
    let body = lodash.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }

    if (lodash.isBoolean(body.completed) && body.completed) {
        console.log("reached here");
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((docs) => {
        if (!docs) {
            return res.status(404).send();
        }
        console.log(docs);
        res.send({ docs });
    }).catch((e) => {
        res.status(400).send(e);
    })


})
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});
