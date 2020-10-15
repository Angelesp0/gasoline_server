const sql = require("./db.js");
// constructor
const Events = function(events) {
    this.id_events = rules.id_rules;
    this.title = rules.title;
    this.description = rules.description;
    this.start = rules.start;
    this.end = rules.end;
    this.division_id_division = rules.division_id_division;
};


// Get All Users
Events.getAll = result => {
  console.log('modelo');
    sql.query("SELECT * FROM events", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Events.getEventsByDivision = (divisionId, result) => {
    console.log(divisionId);
    sql.query(`SELECT * FROM events WHERE division_id_division = ${divisionId}`, (err, res) => {
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


module.exports = Events;
