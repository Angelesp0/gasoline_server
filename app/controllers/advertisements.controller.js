const Advertisements = require("../models/advertisements.model.js");


// Retrieve all Customers from the database.
exports.findAll = async(req, res) => {
  console.log('controldor');
    Advertisements.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
}

// Find one user by id
exports.findById = (req, res) => {
    Advertisements.findById(req.params.divisionId, (err, data) => {
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


exports.postAdvertisements = async(req, res, next) => {
    console.log("controlador");
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } 
    // Create a Customer
    const advertisements = new Advertisements({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        url: req.body.url,
        img: req.body.img,
        division_id_division: req.params.divisionId
    });
    // Save Customer in the database
    Advertisements.postAdvertisements(advertisements, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo a currido al crear el usuario"
            });
        else res.send(data);
    });
};



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
