let mongodb = require('mongodb');

let { MongoClient, ObjectID } = mongodb;



MongoClient.connect("mongodb://localhost:27017/Todoapp", (err, client) => {
    if (err) {
        return console.log("Unable to connect to the database");
    }
    console.log("Connected to the mongodb server");
    const db = client.db('Todoapp');



    client.close();
})