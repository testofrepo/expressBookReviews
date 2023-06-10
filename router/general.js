const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!isValid(username)){
      users.push({"username":username,
      "password":password},)
      return res.send("User registered");
  }
  else{
    return res.send("User already registered");
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return Promise.resolve(res.send(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let details =books[isbn];
  
  return Promise.resolve(res.send(details));
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  const author = req.params.author;
let data=[];
  for(var book in books){
    if(books[book].author==author){
        data.push(books[book]);
        
    }
  }
  data2 = JSON.stringify(data);
  return res.send(data2);
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    const title = req.params.title;
    data = [];
    for(var book in books){
      if(books[book].title==title){
          data.push(books[book]);
          
      }
    }
    return res.send(JSON.stringify(data));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn= req.params.isbn;
  let data = books[isbn].review;
  res.send(data);
});

module.exports.general = public_users;
