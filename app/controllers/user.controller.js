const User = require('../models/user.model');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
      .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({
      message: err.message || "Something went wrong while getting list of users."
    });
    });
    };
    // Create and Save a new User
    exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstName || !req.body.email) {
      return res.status(400).send({
      message: "First Name and Email Address is required"
    });
    }
    // Create a new User
    const user = new User({
        firstName: req.body.firstName, 
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        status:req.body.status,
        isActive:req.body.isActive,
        role:req.body.role
    });
    // Save user in the database
    user.save()
      .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
      message: err.message || "Something went wrong while creating new user."
    });
    });
    };
    // Find a single User with a id
    exports.findOne = (req, res) => {
     User.findById(req.params.id)
      .then(user => {
      if(!user) {
       return res.status(404).send({
       message: "User not found with id " + req.params.id
     });
    }
     res.send(user);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
        message: "User not found with id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error getting user with id " + req.params.id
    });
    });
    };
    

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
      return res.status(400).send({
      message: "Please fill all required field"
    });
    }
    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        firstName: req.body.firstName, 
        // email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        status:req.body.status,
        isActive:req.body.isActive,
        role:req.body.role
    }, {new: true})
    .then(user => {
     if(!user) {
       return res.status(404).send({
       message: "user not found with id " + req.params.userId
     });
    }
    res.send(user);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
      message: "user not found with id " + req.params.userId
    });
    }
    return res.status(500).send({
      message: "Error updating user with id " + req.params.id
    });
    });
    };




// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send({message: "user deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

