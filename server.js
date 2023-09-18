const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());  // server request can read with json format

server.listen(3000, () => {
  console.log("The server is running ");
})

const users = [
  {
      id:"helloid",
      name:"Danny",
      email:"dannyfake@gmail.com"
  },
  {
    id:"jennyprogrammer",
    name:"Jenny",
    email:"jennyawesome@gmail.com"
  },
  {
    id:"sammy",
    name:"Sam",
    email:"samsammy@gmail.com"
  }
]

// Read users
server.get("/api/user", (req,res) => {
  res.json(users);
})

// Read
server.get("/api/user/:id", (req,res) => {
  console.log(req.params.id);
  const user = users.find((u)=> {
    return u.id === req.params.id;
  })

  if(user) {
    res.json(user);
  } else {
    res.status(404).json({errorMessage:'User was not found.'});
  }
})

// Create
server.post("/api/user", (req,res) => {
  //console.log(req.body);
  users.push(req.body);
  res.json(users);
})

// Update user
server.put("/api/user/:id", (req,res) => {
  let foundIndex = users.findIndex(u=>u.id === req.params.id);
  if(foundIndex === -1) {
    res.status(404).json({errorMessage:'User was not found.'});
  } else {
    users[foundIndex] = {...users[foundIndex], ...req.body}  // ... rest operators
    res.json(users[foundIndex]);
  }
})

// Delete user
server.delete("/api/user/:id", (req,res) => {
  let foundIndex = users.findIndex(u=>u.id === req.params.id);
  if(foundIndex === -1) {
    res.status(404).json({errorMessage:'User was not found.'});
  } else {
    let foundUser = users.splice(foundIndex,1); //splice() - method adds and/or removes array elements
    res.json(foundUser[0]);
  }
})