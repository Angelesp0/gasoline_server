const Companies = require("../models/company.model.js");


// Create One Companies
exports.create = (req, res) => {
    console.log("1.- Controlador");
    console.log('respuesta' + res, 'peticion' + req);
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Customer
    const company = new Companies({
        rfc: req.query.rfc,
        street: req.query.street,
        cp: req.query.cp,
        city: req.query.city,
        tel: req.query.tel,
        company: req.query.company,
        num_ext: req.query.num_ext,
        num_int: req.query.num_int,
        state: req.query.state,
        colony: req.query.colony,
        name: req.query.name,
        last_name: req.query.last_name,
        mobile: req.query.mobile,
        email: req.query.email,
        service: req.query.service,
        invoice: req.query.invoice,
        users_id_user: req.query.users_id_user
    });
    // Save Customer in the database
    Companies.create(company, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo a currido al crear la Empresa"
            });
        else res.send(data);
    });
};

// Find one user by id
exports.findOne = (req, res) => {
    console.log("1.- Controlador");
    Companies.findById(req.params.companyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.id_company}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.id_company
                });
            }
        } else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    console.log("1.- Controlador");
    Companies.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

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