const sql = require("./db.js");
// constructor
const Receipt = function(receipt) {
    this.date = receipt.date;
    this.value = receipt.value;
    this.url = receipt.url;
    this.file = receipt.file;
    this.payments_id_payments= receipt.payments_id_payments;
};
module.exports = Receipt;
