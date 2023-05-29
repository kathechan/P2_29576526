const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

    db.run("CREATE TABLE IF NOT EXISTS contacto (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, comment TEXT NOT NULL, date TEXT NOT NULL, ip TEXT NOT NULL)");
});


module.exports = {
    insert: function (name, email, comment, date, ip) {
        db.run("INSERT INTO contacto (name, email, comment, date, ip) VALUES (?, ?, ?, ?, ?)", [name, email, comment, date, ip], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    },
    select: function (callback) {
        db.all("SELECT * FROM contacto", [], (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    }
}