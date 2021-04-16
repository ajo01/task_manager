// CRUD create read update delete

const mongodb = require('mongodb')


// const MongoClient = require("mongodb").MongoClient;
// const ObjectID = mongodb.ObjectID 
const assert = require("assert");

const {MongoClient, ObjectID} = require('mongodb')
 
const url = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

 
MongoClient.connect(url, { useNewUrlParser:true, useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);
 
  const db = client.db(dbName);

//   db.collection('users').findOne({_id: ObjectID('6077ed317e77200514a6ae95')},(error, user) => {
//         if (error) 
//             return console.log('unable to fetch')

//         console.log(user)
//     })

    // db.collection('users').find({age:20}).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({age:20}).count((error, count) => {
    //     console.log(count)
    // })

    db.collection('tasks').findOne({_id: ObjectID("6077f1d0bad700053666ce8f")},(error, tasks) => {
        console.log(tasks)
    })

    db.collection('tasks').find({completed: false}).toArray((error, uncompleted) => {
        console.log(uncompleted)
    })
})
 

