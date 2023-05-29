const express = require('express');
const router = express.Router();
const logicaDB = require('./logicaDB');
const db = ('./logicaDB');
const axios = require('axios');




/* GET home page. */
router.get('/', function(req, res, next) {
  let name = 'Katherine Perez'
  res.render('index', { title: 'Express' });
});
const API_KEY = 'd1a67fd9aedb3aded415ca7c1909f1e3';

function getCountryFromIP(ip) {
  const url = `http://api.ipstack.com/${ip}?access_key=${API_KEY}`;

  return axios.get(url)
    .then(response => {
      const country = response.data.country_name;
      return country;
    })
    .catch(error => {
      console.log(error);
      throw new Error('Error al obtener la ubicación del usuario.');
    });
}

router.get('/api/ipstack/:ip', (req, res) => {
  const ip = req.params.ip;
  const url = `http://api.ipstack.com/${ip}?access_key=${API_KEY}`;

  axios.get(url)
    .then(response => {
      const country = response.data.country_name;
      res.json({ country });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener la ubicación del usuario.' });
    });
});

router.post('/', function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let comment = req.body.comment;
  let date = new Date(); 
  let formattedDate = date.toLocaleDateString("es-ES");
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
   ip = formatIP(ip);
   function formatIP(ip) {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(ip)) {
      return ip.match(ipRegex)[0];
    } else {
      return ip;
    }
  }
  
  getCountryFromIP(ip)
  .then(country => {
    logicaDB.insert(name, email, comment, date, ip, country);
    console.log({ name, email, comment, date, ip, country });
    res.redirect('/');
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la ubicación del usuario.' });
  });
});


router.get('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});

module.exports = router;