let mongodb = require('mongodb');

let { MongoClient, ObjectID } = mongodb;



MongoClient.connect("mongodb://localhost:27017/Todoapp", (err, client) => {
    if (err) {
        return console.log("Unable to connect to the database");
    }
    console.log("Connected to the mongodb server");
    const db = client.db('Todoapp');
    // db.collection('todo').find({ _id: new ObjectID("5ab264c6c6bbef0680a5400c") }).toArray().then((document) => {
    //     console.log("Fetching Data");
    //     console.log(JSON.stringify(document, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fetch");
    // })

    // db.collection('todo').find().count().then((count) => {
    //     console.log(`count : ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch");
    // })
    db.collection('users').find({ name: "Ankit" }).count().then((count) => {
        console.log(`count : ${count}`);
    }, (err) => {
        console.log("Unable to fetch");
    })
    // client.close();
})