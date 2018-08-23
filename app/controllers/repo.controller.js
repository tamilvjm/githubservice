const Repo = require('../models/repo.model.js');


exports.create = (req, res) => {

    if(!req.body) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }

    console.log(req.body);
    Repo.collection.insertMany(req.body)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating."
        });
    });
};

exports.findAll = (req, res) => {
    Repo.find({ username: req.params.username }).select().exec()
    .then(repos => {
        res.json(repos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving."
        });
    });
};

