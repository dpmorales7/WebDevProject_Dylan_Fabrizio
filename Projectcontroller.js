// ProjectController.js
// controller for project and handling 
 
const dao = require('../model/ProjectDaoJson');
 
// eturns all projects as JSON
exports.getAll = function (req, res, next) {
  res.status(200);
  res.send(dao.readAll());
  res.end();
};
 
// returns a single project by id
exports.getOne = function (req, res, next) {
  const id = parseInt(req.params.id);
  const project = dao.read(id);
  if (project) {
    res.status(200).send(project);
  } else {
    res.status(404).send({ error: 'Project not found' });
  }
  res.end();
};
