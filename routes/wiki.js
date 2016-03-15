var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
	Page.find({}).exec()
	.then(function(pages){
		res.render('index', {pages: pages});
	})
	.then(null,next);
  // res.send('got to GET /wiki/');
  // res.redirect('/');
});

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = new Page({
  	// author: req.body.author,
  	// email: req.body.email,
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    tags: req.body.tags.split(', ')
    // urlTitle: req.body.title.replace(' ','_')
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(function(page){
  	console.log(page);
  	return page;
  })
  .then(function (savedPage) {
  	res.redirect(savedPage.route);
  })
  .then(null,next);
 //  .catch(function(err) {
	// 	console.error(err);
	// });
  // -> after save -> res.redirect('/');

});


router.get('/add', function(req, res, next) {
  // res.send('got to GET /wiki/add');
  // res.render('../views/addpage.html');
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
	// res.send(req.params.urlTitle);
	Page.findOne({urlTitle: req.params.urlTitle}).exec()
	.then(function(page){
		res.render('wikipage', {page: page});
	})
	.catch(next);
	// .then(function(foundPage){
	// 	res.json(foundPage);
	// }).catch(next);
});

module.exports = router;
