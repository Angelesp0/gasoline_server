const Division = require("../models/division.model.js");


// Retrieve all Customers from the database.
exports.getAll = (req, res) => {
  console.log('controldor');
    Division.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};


// Create One Companies
exports.postDivision = (req, res) => {
    console.log("1.- Controlador");
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Customer
    const division = new Division({
        id_division: req.query.id_division,
        name: req.query.name,
        street: req.query.street
    });
    // Save Customer in the database
    Division.postDivision(division, req.query.id_users, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo a currido al crear la Empresa"
            });
        else res.send(data);
    });
};


// Find one user by id
exports.getUsersByDivision = (req, res) => {
    Division.getUsersByDivision(req.params.divisionId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.divisionId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.divisionId
                });
            }
        } else res.send(data);
    });
};
