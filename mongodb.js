// CRUD create read update delete

const mongodb = require('mongodb')


// const MongoClient = require("mongodb").MongoClient;
// const ObjectID = mongodb.ObjectID 
const assert = require("assert");

const {MongoClient, ObjectID} = require('mongodb')
 
const url = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
 
MongoClient.connect(url, { useNewUrlParser:true, useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  db.collection('users').insertOne({
      _id: id,
      name:'Victor',
      age: 31
  }, (err, result) => {
      if (err) {
          return console.log('unable to insert user')
      }
      console.log(result.ops)
    })



//   db.collection('users').insertMany([
//       {
//         name:'Andrew',
//         age: 27
//       },
//       {
//         name:'May',
//         age: 19
//       }
//   ], (error, result)=> {
    // if (error) {
    //     return console.log('Unable to insert users')
    // }
    // console.log(result.ops)
//   })


//     db.collection('tasks').insertMany([
//         {
//             description:'HW1',
//             completed: true
//         },
//         {
//             description:'PA2',
//             completed: false
//         }

// ], (error, result)=> {
//     if (error) {
//         return console.log('Unable to insert users')
//     }
//     console.log(result.ops)
// })

})
 

