const sql = require("./db.js");
const { json } = require("body-parser");
// constructor
const Autobus = function(autobus) {
    this.id_autobus = autobus.id_autobus;
    this.nombre = autobus.nombre;
    this.latitud = autobus.latitud;
    this.longitud = autobus.longitud;
};

// Create one user
/*
Users.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error1: ", err);
            result(err, null);
            return;
        }

        console.log("Usuario Creado: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};
*/
// Get All Users
Autobus.getAll = result => {
  console.log("2.- Model");
  return new Promise((resolve, reject) => {
      sql.query("SELECT * FROM autobus", (err, res) => {
          if (err) reject(err)
          resolve(res);
      });
  });
};
// Get 1 User From ID
/*
Users.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id_user = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            sql.query(`SELECT * FROM role_has_menu WHERE role_id_role = ${res[0][role_id_role]}`, (err, res) => {
                //result(null, res[0]);
                return;
            });
            //result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};
*/
/*
Users.findByEmail = (email) => {
    console.log("2.- Model");
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM users WHERE email = ?  ", [email], (err, res) => {
            if (err) reject(err)
            resolve(res[0]);
        });
    });
};
*/
/*
Users.findRoleMenu = (id_role) => {
    console.log("3.- Roles");
    return new Promise((resolve, reject) => {
        sql.query(`SELECT menu_id_menu FROM role_has_menu WHERE role_id_role = ${id_role}`, (err, res) => {
            console.log("4.- menu");

            if (err) reject(err)
            resolve(res);
        });
    })
}
Users.findMenu = (id_menu) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM menu WHERE id_menu = ${id_role}`, (err, res) => {
            if (err) reject(err)
            resolve(res);
        });
    })
}
*/

// update User
/*
Users.updateById = (id_user, user, result) => {
    sql.query(
        "UPDATE users SET first_name = ?, last_name = ?, direction = ?, colony = ?, cp = ?, role = ?, email = ?, password = ? WHERE id_user = ? ", [user.first_name, user.last_name, user.direction, user.colony, user.cp, user.role, user.email, user.password, id_user],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated usuario: ", { id_user: id_user, ...user });
            result(null, { id_user: id_user, ...user });
        }
    );
};
*/
/*
Users.remove = (id_user, result) => {
    sql.query("DELETE FROM users WHERE id_user = ?", id_user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with id: ", id_user);
        result(null, res);
    });
};
*/

module.exports = Autobus;
