const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    if(users[username]){
        return true;

    }
    else
    return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    if(username && password){
        let val = users.filter((user) =>{
            if(user.username===username && user.password===password){
                return true;
            }
            else{
                res.send("Enter valid username and password");
            }
        })
    }
    else
    return res.send("Provide username and password")
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(authenticatedUser){
        res.send("Logged in");
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review= req.params.review;
  books[isbn].review=(review);
  res.send("Review added")
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
   
    books[isbn].review={};
    res.send("Review deleted")
  });
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
