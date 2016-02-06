'use strict';

var express = require('express');
var router = express.Router();

var Album = require('../models/album');
var Image = require('../models/image');
var User = require('../models/user');

var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });

router.use(Usr.isLoggedIn);

router.get('/index', function(req, res) {
  res.render('albums');
});

router.get('/add', function(req, res) {
  res.render('addAlbum');
});

router.get('/show/:albumId', function(req, res) {
  res.render('showPage', {albumId: req.params.albumId});
});

router.post('/:albumId/upload', User.isLoggedIn, upload.array('images'), function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if(err || !user) {
      return res.status(err ? 400 : 200).send(err || 'user not found');
    }
    if(user.albums.indexOf(req.params.albumId) === -1) {
      return res.status(401).send();
    }
    Album.findById(req.params.albumId, function(err, album) {
      if(err || !album) return res.status(err ? 400 : 404).send(err || 'album not found');
      Image.upload(req.files, function(err, images) {
        if(err) return res.status(400).send(err);
        var imageIds = images.map(function(image) {
          return image._id;
        });
        album.images = album.images.concat(imageIds);
        album.save(function(err, savedAlbum) {
          if(err) return res.status(400).send(err);
          res.redirect('/albums/show/' + req.params.albumId);
        });
      });
    });
  });
});

router.post('/', function(req, res) {
  Album.create(req.body, function(err, album) {
    User.findById(req.user._id, function(err, user) {
      user.albums.push(album._id);
      user.save(function(err) {
        res.send();
      });
    });
  });
});

router.get('/', function(req, res) {
  User,findById(req, user._id).populate('albums').exec(function(err, user) {
    res.status(err ? 400 : 200).send(err || user.albums);
  });
});

router.get('/:albumId', function(req, res) {
  Album.findById(req.params.albumId).populate('images').exec(function(err, album) {
    res.render('showPage', {album: album});
  });
});

router.delete('/:albumId/:imageId', function(req, res) {
  Image.findByIdAndRemoveFromAWS(req.params.imageId, function(err, data) {
    if(err) return res.status(400).send(err);
    Album.findById(req.params.albumId, function(err, album) {
      var index = album.images.indexOf(req.params.imageId);
      album.images.splice(index, 1);
      album.save(function(err) {
        res.status(err ? 400 : 200).send(err);
      });
    });
  });
});