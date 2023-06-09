const express = require('express');
const router = express.Router();
const logicaDB = require('./logicaDB');
const axios = require('axios');
const nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  const SECRET_KEY = "6LfiK2UmAAAAAPVFZW8uJP1SBKGlObdVDlqbBRwS";
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${req.body["g-recaptcha-response"]}`;
  
  fetch(url, {
      method: "POST"
    })
    .then(response => response.json())
    .then(google_response => {
      if (google_response.success == true) {
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
            console.log("IP no se pudo formatear");
        }
        function getCountryFromIP(ip) {
            const API_KEY = 'bbf9610212ee092c996e920fe458f171';
            const url = `http://api.ipstack.com/${ip}?access_key=${API_KEY}`;
          
            return axios.get(url)
              .then(response => {
                const data = response.data;
                const country = response.data.country_name;
                return country;
              })
              .catch(error => {
                console.log(error);
                return Promise.reject('Error al obtener la ubicación del usuario.');
            });
        }
        
        getCountryFromIP(ip)
        .then(country => {
            logicaDB.insert(name, email, comment, date, ip, country);
            console.log({ name, email, comment, date, ip, country });

            // Configurar el objeto transporter de Nodemailer
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com', // Cambiar según tu proveedor de correo electrónico
              port: 587,
              secure: false,
              auth: {
                user: 'katherineperez125@gmail.com', // 
                pass: '197943865652' // 
              }
            });

            // Configurar el correo electrónico
            let mailOptions = {
              from: 'katherineperez125@gmail.com', // 
              to: 'test009@arodu.dev', //
              subject: 'Nuevo registro en el formulario',
              html: `
                <p>Se ha registrado un nuevo usuario:</p>
                <ul>
                  <li>Nombre: ${name}</li>
                  <li>Correo electrónico: ${email}</li>
                  <li>Comentario: ${comment}</li>
                  <li>Fecha: ${formattedDate}</li>
                  <li>IP: ${ip}</</li>
                  <li>País: ${country}</li>
                </ul>
              `
            };

            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                res.status(500).send("Ha ocurrido un error al enviar el correo electrónico");
              } else {
                console.log('Correo electrónico enviado: ' + info.response);
                res.render('index', { message: 'Los datos han sido enviados correctamente.' });
              }
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener la ubicación del usuario.' });
        });
      } else {
        res.status(400).send("El desafío de reCAPTCHA no se ha completado correctamente");
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Ha ocurrido un error al verificar el desafío de reCAPTCHA");
    });
});
 
router.get('/contactos', function(req, res, next) {
  logicaDB.select(function (rows) {
    console.log(rows);
  });
  res.send('ok');
});

module.exports = router;