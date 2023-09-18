const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());  // server request can read with json format

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
  }
]

server.get("/api/user", (req,res) => {
  res.json(users);
})

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

server.post("/api/user", (req,res) => {
  //console.log(req.body);
  users.push(req.body);
  res.json(users);
})