var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {});
});

router.get('/brands', function(req, res, next) {
  res.render('brands', {});
});

router.get('/creators', function(req, res, next) {
  res.render('creators', {});
});

router.get('/faq', function(req, res, next) {
  res.render('faq', {});
});

router.get('/contact/all', function(req, res, next) {
  res.render('contactAll');
});

router.get('/contact/brand', function(req, res, next) {
  res.render('contactBrand');
});

router.get('/contact/creator', function(req, res, next) {
  res.render('contactCreator');
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {});
});

router.get('/about', function(req, res, next) {
  res.render('about', {});
});

router.get('/privacy', function(req, res, next) {
  res.render('privacy', {});
});

router.get('/terms', function(req, res, next) {
  res.render('terms', {});
});


module.exports = router;
