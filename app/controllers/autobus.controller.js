const Autobus = require("../models/autobus.model.js");


// Retrieve all Customers from the database.
exports.findAll = async(req, res) => {
    console.log("1.- Controlador");
    const autobus = await Autobus.getAll();

    if (autobus === undefined) {
        console.log(autobus);
        res.json({
            error: 'no hay autobuses'
        });
        } else {
            res.json(autobus);
        }
    }

/*
// Update Companies.
exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Companies.updateById(
        req.params.companyId,
        new Companies(req.query),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.companyId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.companyId
                    });
                }
            } else res.send(data);
        }
    );

};
*/
/*
// Delete Companies
exports.delete = (req, res) => {
    Companies.remove(req.params.companyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.companyId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.companyId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};
*/
