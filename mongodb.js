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

    updatePromise = db.collection('users').deleteMany({
        age:19
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


})
 

