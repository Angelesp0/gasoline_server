const sql = require("./db.js");
// constructor
const Complaints = function(complaints) {
    this.id_complaints = complaints.id_complaints;
    this.subject = complaints.subject;
    this.message = complaints.message;
    this.division_id_division = complaints.division_id_division;
};


// Get All Users
Complaints.getAll = result => {
  console.log('modelo');
    sql.query("SELECT * FROM complaints", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


module.exports = Complaints;
