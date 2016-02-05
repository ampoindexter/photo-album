'use strict';

var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {
  console.log("User:", req.user);
  res.render('index', { 
    title: "Picturesque", 
    user: req.user, 
    state: "home"});
});

router.get('/login', function(req, res, next) {
  res.render('userForm', {state: 'login', title: "Login"});
});

router.get('/register', function(req, res, next) {
  res.render('userForm', {state: 'register', title: "Register"});
});

// go to add game form 
// router.get('/addAlbum', authMiddleware, function(req, res, next) {
//   console.log("User: ", req.user);
//   res.render('addAlbum', { user: req.user});
// });

module.exports = router;