const mongoose = require('mongoose');

const RepoSchema = mongoose.Schema({
    username: String,
    title: String,
    stars: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Repo', RepoSchema);