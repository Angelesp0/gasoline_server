const sql = require("./db.js");
// constructor
const Division = function(division) {
    this.name = division.name;
    this.street = division.street;
};


// Get All Users
Division.getAll = result => {
  console.log('modelo');
    sql.query("SELECT * FROM division", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Division.postDivision = (newDivision, id_user, result) => {
  console.log(newDivision);
    sql.query("INSERT INTO division SET ?", newDivision, (err, res) => {
        console.log(res);
        if (err) {
            console.log("error1: ", err);
            result(err, null);
            return;
        }
        console.log(res.insertId);
        console.log(id_user);
        sql.query("UPDATE users SET division_id_division = ? WHERE id_users = ?", [res.insertId, id_user], (err, res) => {
            console.log('actualizacion de usuario');
            console.log(res);
            if (err) {
                console.log("error1: ", err);
                result(err, null);
                return;
            }
            console.log("Usuario Actualizado: ", { id: res.insertId, ...newDivision });
            result(null, { id: res.insertId, ...newDivision });

        });

    });
};

Division.getUsersByDivision = (divisionId, result) => {
    sql.query(`SELECT * FROM users WHERE division_id_division = ${divisionId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
        result(null, res);
        }
    });
};





module.exports = Division;
