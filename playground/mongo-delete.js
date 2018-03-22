let mongodb = require('mongodb');

let { MongoClient, ObjectID } = mongodb;



MongoClient.connect("mongodb://localhost:27017/Todoapp", (err, client) => {
    if (err) {
        return console.log("Unable to connect to the database");
    }
    console.log("Connected to the mongodb server");
    const db = client.db('Todoapp');

    // db.collection("todo").deleteOne({ text: "Eating Lunch" }).then((result) => {
    //     console.log(result);
    // })
    // db.collection("todo").findOneAndDelete({ completed: false }).then((result) => {
    //     console.log(result);
    // })
    db.collection("users").findOneAndDelete({ _id: new ObjectID("5ab27c40aa671b2ce8bb911b") }).then((result) => {
        console.log(result);
    })
    db.collection('users').deleteMany({ name: "Ankit" }).then((result) => {
        console.log(result);
    })
    // client.close();
})