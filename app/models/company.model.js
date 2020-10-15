const sql = require("./db.js");
// constructor
const Companies = function(company) {
    this.id_company = company.id_company;
    this.rfc = company.rfc;
    this.street = company.street;
    this.cp = company.cp;
    this.city = company.city;
    this.tel = company.tel;
    this.company = company.company;
    this.num_ext = company.num_ext;
    this.num_int = company.num_int;
    this.state = company.state;
    this.colony = company.colony;
    this.name = company.name;
    this.last_name = company.last_name;
    this.mobile = company.mobile;
    this.email = company.email;
    this.service = company.service;
    this.invoice = company.invoice;
    this.users_id_user = company.users_id_user;
};
// Create one company
Companies.create = (newCompany, result) => {
    console.log("2.- Model");
    //console.log(newCompany);
    sql.query("INSERT INTO company SET ?", newCompany, (err, res) => {
        if (err) {
            console.log("error1: ", err);
            result(err, null);
            return;
        }
        console.log("Empresa Creada: ", { id: res.id_company, ...newCompany });
        result(null, { id: res.id_company, ...newCompany });
    });
};
// Get 1 User From ID
Companies.findById = (id_company, result) => {
    console.log("2.- Model");
    sql.query(`SELECT * FROM company WHERE id_company = ${id_company}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Empresa encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "Empresa no encontrada" }, null);
    });
};
// Get All Users
Companies.getAll = result => {
    console.log("2.- Model");
    sql.query("SELECT * FROM company", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};
// update User
Companies.updateById = (id_company, company, result) => {
    sql.query(
        "UPDATE company SET rfc = ?, street = ?, cp = ?, city = ?, tel = ?, company = ?, num_ext = ?, num_int = ?, state = ?, colony = ?, name = ?, last_name = ?, mobile = ?, email = ?, service = ?, invoice = ?, users_id_user = ? WHERE id_company = ? ", [company.rfc, company.street, company.cp, company.city, company.tel, company.company, company.num_ext, company.num_int, company.state, company.colony, company.name, company.last_name, company.mobile, company.email, company.service, company.invoice, company.users_id_user, id_company],
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

            console.log("updated usuario: ", { id_company: id_company, ...company });
            result(null, { id_company: id_company, ...company });
        }
    );
};
// remove companies
Companies.remove = (id_company, result) => {
    sql.query("DELETE FROM company WHERE id_company = ?", id_company, (err, res) => {
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

        console.log("deleted company with id: ", id_company);
        result(null, res);
    });
};
module.exports = Companies;