const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const User = require('./models/User');
server.use(bodyParser.json());  // server request can read with json format

const mongoose = require('mongoose');
const _username = 'root';
const _password = 'root';
// Define the database URL to connect to.
const MONGODB_URL = `mongodb+srv://${_username}:${_password}@cluster0.royy3xi.mongodb.net/user?retryWrites=true&w=majority&appName=AtlasApp`;

// Wait for database to connect, logging an error if there is a problem
run().catch((err) => console.log(err));
async function run() {
  mongoose.connect(MONGODB_URL);
}

server.listen(3000, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log("The server is running ");
  }
})


server.get('/', (req,res) =>{
  res.send("welcome");
})

// Read users
server.get("/api/user", async (req,res) => {
  // console.log(await mongoose.connection.db.listCollections().toArray()); //get list of db tables
  try {
    const result = await User.find();
    res.json({"user":result});
  } catch(e) {
    res.status(500).json({error: e.message});
  }
});

// Read user
server.get("/api/user/:id", async (req,res) => {
  console.log({
    requestParams: req.params,
    requestQuery: req.query
  });
  const {id} = req.params;
  const user = await User.findById(id);
  if(!user) {
    res.status(404).json({error: 'User is not found'});
  } else {
    res.json({user});
  }
})

// Create user
server.post("/api/user", async (req,res) => {
  console.log(req.body);
  // const user = new User({
  //   email: req.body.email,
  //   name: req.body.name,
  //   age: req.body.age
  // });
  const user = new User(req.body); // works same above
  try {
    await user.save();
    res.status(201).json({user});
    // res.status(201).json({user: user}); // works same above
    // res.status(201).json(user); // not showing property in return json
  } catch(e) {
    res.status(400).json({error: e.message});
  }
})

// Update user
server.put("/api/user/:id", async (req,res) => {
  console.log(req.body);
  const userId = req.body._id;
  try {
    const result = await User.replaceOne({_id: userId}, req.body); // replace entire object, so missing fields will be gone
    res.json({updatedCount: result.modifiedCount});
  } catch(e) {
    res.status(400).json({error: e.mesage});
  }
})

// Delete user
server.delete("/api/user/:id", async (req,res) => {
  const userId = req.body._id;
  try {
    const result = await User.deleteOne({_id: userId});
    console.log(result);
    res.json({deletedCount: result.deletedCount});
  } catch(e) {
    res.status(500).json({error: e.mesage});
  }
})


