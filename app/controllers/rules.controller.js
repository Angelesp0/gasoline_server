const Rules = require("../models/rules.model.js");


// Retrieve all Customers from the database.
exports.findAll = async(req, res) => {
  console.log('controldor');
    Rules.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
}

// Find one user by id
exports.getRulesByDivision = (req, res) => {
    Rules.getRulesByDivision(req.params.divisionId, (err, data) => {
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
