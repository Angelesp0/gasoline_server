const Users = require("../models/user.model.js");
const Receipt = require("./../models/receipt.model")
const Payment = require("../models/payment.model")

const conf = require("./../config/jwt.config");
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');

const createToken = (user) => {
    let payload = {
        userId: user.id,
        createAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, conf.TOKEN_KEY);
};

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

// Create One User
exports.postUsers = async(req, res, next) => {
    console.log("controlador");
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const password = req.body.password
    const hashedPassword = await hashPassword(password);
    // Create a Customer
    const user = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        division_id_division: req.body.division_id_division,
        role_id_role: req.body.role_id_role,
        email: req.body.email,
        password: hashedPassword
    });
    console.log(hashPassword);
    // Save Customer in the database
    Users.postUsers(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo a currido al crear el usuario"
            });
        else res.send(data);
    });
};


exports.activeUser = (req, res) => {
    console.log(req.body);

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
    }

    Users.activeUser(
        req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );

};



// login
exports.login = async(request, response) => {
    console.log("1.- Controlador");
    const user = await Users.findByEmail(request.body.username);
    //const role_menu = await Users.findRoleMenu(user['role_id_role']);
    if (user === undefined) {
        console.log(user);
        response.json({
            error: 'Error, email or password not found'
        });
    } else {
        const equals = bcrypt.compareSync(request.body.password, user.password);
        if (!equals) {
            response.json({
                erro: 'Error, email or password not found'
            });
        } else {
            response.json({
                //role_menu,
                user,
                succesfull: createToken(user),
                done: 'Login correct'
            })
        }
    }

}

exports.payments = async(req, res) => {
      const user = await Users.payment(req.params.userId);
      if (user === undefined) {
          console.log(user);
          res.json({
              error: 'Error, email or password not found'
          });
      } else {
          res.json(
              user
          )
      }

};


exports.postPayments = async(req, res, next) => {
    console.log("controlador");
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } 
    // Create a Customer
    const payment = new Payment({
        description: req.body.description,
        amount: req.body.amount,
        status: req.body.status,
        update_time: req.body.update_time,
        type: req.body.type,
        users_id_users: req.params.userId
    });
    // Save Customer in the database
    Users.postPayments(payment, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo a currido al crear el usuario"
            });
        else res.send(data);
    });
};


exports.getLastPayment = async(req, res) => {
    const user = await Users.getLastPayment(req.params.userId);
    if (user === undefined) {
        console.log(user);
        res.json({
            error: 'Error, email or password not found'
        });
    } else {
        res.json(
            user
        )
    }

};

exports.receipt = (req, res) => {
    console.log(req.file)
    console.log("1.- Controlador");
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Customer
    const receipt = new Receipt({
        date: req.body.date,
        value: req.body.value,
        url: './public',
        file: req.file.filename,
        payments_id_payments: req.body.payments_id_payments,
    });
    console.log(receipt);
    // Save Customer in the database
    Users.receipt(receipt, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Algo a currido al crear la Empresa"
            });
        else res.send(data);
    });
}





// Find one user by id
exports.findOne = (req, res) => {
    Users.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  console.log('controldor');
    Users.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};
// Retrieve all Customers from the database.
exports.disabledUsers = (req, res) => {
    console.log('controldor');
      Users.disabledUsers((err, data) => {
          if (err)
              res.status(500).send({
                  message: err.message || "Some error occurred while retrieving customers."
              });
          else res.send(data);
      });
  };

  exports.usersStatus = (req, res) => {
    console.log('controldor');
      Users.usersStatus(req.params.id, (err, data) => {
          if (err)
              res.status(500).send({
                  message: err.message || "Some error occurred while retrieving customers."
              });
          else res.send(data);
      });
  };

  


// Retrieve all Customers from the database.
exports.getManager = (req, res) => {
    console.log('controldor');
      Users.getManager((err, data) => {
          if (err)
              res.status(500).send({
                  message: err.message || "Some error occurred while retrieving customers."
              });
          else res.send(data);
      });
  };



exports.update = (req, res) => {

    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Users.updateById(
        req.params.userId,
        new Users(req.query),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );

};

exports.delete = (req, res) => {
    Users.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.userId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

//file upload
