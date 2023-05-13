var express = require('express');
const db = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let name = 'Katherine Perez'
  res.render('index', {
    title: '29576526',
    name: name,
  });
});

router.post('/', function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let comment = req.body.comment;
  var hoy = new Date();
	var horas = hoy.getHours();
	var minutos = hoy.getMinutes();
	var segundos = hoy.getSeconds();
  	var hora = horas + ':' + minutos + ':' + segundos + ' ';
  	var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear() + '//' + hora;

	  var ip = req.headers["x-forwarded-for"];
	  if (ip){
		var list = ip.split(",");
		ip = list[list.length-1];
	 } else {
		ip = req.connection.remoteAddress;
	  }

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