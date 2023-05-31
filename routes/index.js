const express = require('express');
const router = express.Router();
const logicaDB = require('./logicaDB');
const axios = require('axios');
const API_KEY = 'd1ad1a67fd9aedb3aded415ca7c1909f1e3';
const fetch = require('node-fetch');
var ip='190.142.194.38'

router.get('/', function(req, res, next) {
  let name = 'Katherine Perez'
  res.render('index', { title: 'Express' });
});

router.post('/',(req,res)=>{
  const SECRET_KEY = "6LeHRlQmAAAAALSMhb-lNJEHZjuHMIe_2OIVnYXk";
   const url = 
 `https://www.google.com/recaptcha/api/siteverify?secret=${process.env["6LeHRlQmAAAAALSMhb-lNJEHZjuHMIe_2OIVnYXk"]}&response=${req.body["g-recaptcha-response"]}`;

fetch(url, {
     method: "post",
   })
     .then((response) => response.json())
     .then((google_response) => {
   if (google_response.success == true) {
 
router.post('/', function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let comment = req.body.comment;
  let date = new Date(); 
  let formattedDate = date.toLocaleDateString("es-ES");
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if(ip){
    let ip_ls = ip.split(",");
    ip = ip_ls[ip_ls.length -1];
}
else{
    console.log("IP no se pudo formatiar");
}
})
}})
});
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



router.get('/contactos', function(req, res, next) {
  logicaDB.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});

module.exports = router;