
const db = require("../models");
const dataUsers = db.DataUser;

// Create and Save a new dataUsers
exports.create = (req, res) => {
    if (!req.body.user_id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }


    //Create a dataUsers
    const datausers = new dataUsers({
        user_id:req.body.user_id,
        name: req.body.name,
        department: req.body.department,
        position: req.body.position,
        address: req.body.address,
        phone:req.body.phone,
        phone_iffice:req.body.phone_iffice,
        date:req.body.date,
        published: req.body.published ? req.body.published : false
    });

    //Save the dataUsers in the database
    datausers.save(datausers).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while saving the dataUsers"
        });
    });
};

// Retrieve all dataUserss from the database.
exports.findAll = (req, res) => {
    const name = req.query.user_id;
    var condition = name ? { name:  RegExp(name), $option: "i" }  : {};
    dataUsers.find(condition).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dataUserss."
            });
        });

};

// Find a single dataUsers with an id
exports.findOne = (req, res) => {
    const id = req.params.user_id;

    dataUsers.findOne({ id: id }, req.body).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found dataUsers with id " + id });
        else res.send(data);
    })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving dataUsers with id " + id });
        });
};

// Update a dataUsers by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty"
        });

    }
    const id = req.params.user_id;

    dataUsers.findOneAndUpdate({ id: id }, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `Cannot update dataUsers with id=${id}. Maybe dataUsers was not found` });
        } else res.send({ message: "dataUsers updated successfully" });
    })
        .catch(err => {
            res.status(500).send({ message: "Error updating dataUsers with id=" + id });
        });
};

// Delete a dataUsers with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    dataUsers.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `Cannot delete dataUsers with id=${id}. Maybe dataUsers was not found.` });

        } else {
            res.send({ message: "dataUsers was deleted successfully!" });
        }
    })
        .catch(err => {
            res.status(500).send({ message: "Couldn't delete dataUsers with id" + id });
        });
};

// Delete all dataUserss from the database.
exports.deleteAll = (req, res) => {
    dataUsers.deleteMany({}).then(data => {
        res.send({ message: `${data.deletedCount} dataUserss were deleted successfully` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all dataUserss"
        });
    });
};

// Find all published dataUserss
exports.findAllPublished = (req, res) => {
    dataUsers.find({ published: true }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the tutorials."
            });
        });
};
