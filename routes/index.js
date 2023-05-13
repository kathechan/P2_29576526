var express = require('express');
var router = express.Router();
const logicaDB = require('./logicaDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  let name = 'Katherine Perez'
  res.render('index', {
    title: 'P2_29576526',
    name: name,
  });
});

router.post('/', function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let comment = req.body.comment;
  let date = new Date(); // @todo falta formatear la fecha
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // @todo falta formatear la ip

  db.insert(name, email, comment, date, ip);

  res.redirect('/');
});

router.get('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});

module.exports = router;