const mongoose = require('mongoose');

const RepoSchema = mongoose.Schema({
    username: String,
    name: String,
    description: String,
    stargazers_count: Number,
    html_url: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Repo', RepoSchema);