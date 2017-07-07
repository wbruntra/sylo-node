var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main');
});

router.get('/contact', function(req, res, next) {
  res.render('contact/contact');
});

router.get('/contact/:name', function(req, res, next) {
  res.render('contact/' + req.params.name);
});

router.get('/thanks/:name', function(req,res,next) {
  res.render('thanks/' + req.params.name);
});

router.get('/:pageName', function(req, res, next) {
  res.render(req.params.pageName);
});

router.post('/syloforms', function(req, res, next) {
  console.log(req.params);
  res.send('OK');
});


module.exports = router;
