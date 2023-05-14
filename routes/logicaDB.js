const express = require('express');
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();


let db = new sqlite3.Database(__dirname + "/database.db", (err) => {
	if (err) {
		return console.error(err.message);
	}
console.log("Connected to the Sqlite database.");

db.run(
	"CREATE TABLE IF NOT EXISTS contactos(email VARCHAR(20),nombre VARCHAR(20), comentario TEXT,fecha DATATIME,ip TEXT);"
);
});

module.exports - {
	insert: function (name, email, comment, date, ip) {
	db.run(
		"INSERT INTO contactos (name, email, comment, date, ip)	VALUES (?, ?, ?, ?, ?)",
		[name, email, comment, date, ip],
		function (err) { 
			if (err) {
				return console.log(err.message);
			}
			// get the last insert id
			console.log ('A row has been inserted with rowid ${this.lastID}');
	    }
	
	);
  },
  select: function (callback) {
	db.all("SELECT * FROM contactos", [], (err, rows) =>{
		if (err) {
			throw err;
		}
		callback(rows);
	});
  },
};  


