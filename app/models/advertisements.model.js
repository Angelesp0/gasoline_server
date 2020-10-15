const sql = require("./db.js");
// constructor
const Advertisements = function(advertisement) {
    this.id_advertisements = advertisement.id_advertisements;
    this.title = advertisement.title;
    this.description = advertisement.description;
    this.date = advertisement.date;
    this.url = advertisement.url;
    this.img = advertisement.img;
    this.division_id_division = advertisement.division_id_division;
};


// Get All Users
Advertisements.getAll = result => {
  console.log('modelo');
    sql.query("SELECT * FROM advertisements", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


Advertisements.findById = (divisionId, result) => {
    sql.query(`SELECT * FROM advertisements WHERE division_id_division = ${divisionId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Create one user
Advertisements.postAdvertisements = (newUser, result) => {
    sql.query("INSERT INTO advertisements SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error1: ", err);
            result(err, null);
            return;
        }

        console.log("Aviso creado: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};





module.exports = Advertisements;
