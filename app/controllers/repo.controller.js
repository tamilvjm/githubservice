const Repo = require('../models/repo.model.js');


exports.create = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "can not be empty"
        });
    }


    const repo = new Repo({ //Need to change the schema to accept array
        username: req.body.username,
        title: req.body.reponame, 
        stars: req.body.stars
    });

    repo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating."
        });
    });
};

exports.findAll = (req, res) => {
    Repo.find()
    .then(repos => {
        res.send(repos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving."
        });
    });
};

