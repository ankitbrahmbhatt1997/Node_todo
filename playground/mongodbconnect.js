let mongodb = require('mongodb');
// let MongoClient = mongodb.MongoClient;
let { MongoClient, ObjectID } = mongodb;



MongoClient.connect("mongodb://localhost:27017/Todoapp", (err, client) => {
    if (err) {
        return console.log("Unable to connect to the database");
    }
    console.log("Connected to the mongodb server");
    const db = client.db('Todoapp');

    // db.collection('todo').insertOne({
    //     text: "Something to do",
    //     completed: false
    // }, (err, Result) => {
    //     if (err) {
    //         return console.log("Unable to create the collection todo");
    //     }
    //     console.log(Result);
    //     console.log(typeof Result.ops);
    //     console.log(JSON.stringify(Result.ops, undefined, 2))
    // })
    // db.collection('users').insertOne({

    //     name: 'Ankit',
    //     Age: 20,
    //     location: "Ghaziabad"
    // }, (err, Result) => {
    //     if (err) {
    //         return console.log("Unable to create a collection");
    //     }
    //     console.log(JSON.stringify(Result.ops[0]._id.getTimestamp(), undefined, 2));


    // })


    client.close();
})