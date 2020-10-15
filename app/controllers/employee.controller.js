const Employee = require("../models/employee.model.js");


// Retrieve all Customers from the database.
exports.findAll = async(req, res) => {
  console.log('controldor');
  Employee.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
}

exports.findStars = async(req, res) => {
    console.log('controldor');
    Employee.findStars(req.params.idEmployee, (err, data) => {
          if (err)
              res.status(500).send({
                  message: err.message || "Some error occurred while retrieving customers."
              });
          else res.send(data);
      });
  }



