module.exports = (app) => {
    const repos = require('../controllers/repo.controller.js');


    app.post('/repos', repos.create);

 
    app.get('/repos/:username', repos.findAll);
    app.get('/accesstoken/:username', repos.getAccessToken);

}