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

router.get('/contact', function(req, res, next) {
  res.render('contact')
})

router.get('/contact/all', function(req, res, next) {
  res.render('contact-all');
});

router.get('/contact/brand', function(req, res, next) {
  res.render('contactBrand');
});

router.get('/contact/creator', function(req, res, next) {
  res.render('contactCreator');
});

router.get('/contact/influencer-marketing', function(req, res, next) {
  res.render('contact-influencer-marketing');
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

router.get('/thanks/contact', function(req,res,next) {
  res.render('thanks-contact');
});

router.get('/thanks/brand', function(req,res,next) {
  res.render('thanks-brand');
});

router.get('/thanks/creator', function(req,res,next) {
  res.render('thanks-creator');
});

router.post('/syloforms', function(req, res, next) {
  console.log(req.params);
  res.send('OK');
});


module.exports = router;
