let mongodb = require('mongodb');

let { MongoClient, ObjectID } = mongodb;



MongoClient.connect("mongodb://localhost:27017/Todoapp", (err, client) => {
    if (err) {
        return console.log("Unable to connect to the database");
    }
    console.log("Connected to the mongodb server");
    const db = client.db('Todoapp');
    // db.collection("todo").findOneAndUpdate({ _id: new ObjectID('5ab298570fae3e3e6d5a0967') },
    //     { $set: { completed: true } }, { returnOriginal: false }).then((result) => {
    //         console.log(result);
    //     })
    db.collection('users').findOneAndUpdate({ name: "Garvit" }, {
        $set: { name: "Ankit" },
        $inc: { Age: +1 }
    }).then((result) => {
        console.log(result);
    })
    // client.close();
})