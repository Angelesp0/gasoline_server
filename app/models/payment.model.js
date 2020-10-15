const sql = require("./db.js");
// constructor
const Payment = function(payment) {
    
    this.description = payment.description;
    this.amount = payment.amount;
    this.status = payment.status;
    this.update_time= payment.update_time;
    this.type= payment.type;
    this.users_id_users= payment.users_id_users;

};
module.exports = Payment;
