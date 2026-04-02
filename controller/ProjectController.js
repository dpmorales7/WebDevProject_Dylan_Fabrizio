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

exports.create = function (req, res, next) {
  const project = req.body;
  dao.create(project);
  res.status(201);
  res.send(project);
  res.end();
};

exports.update = function (req, res, next) {
  const id = parseInt(req.params.id);
  const project = req.body;
  project._id = id; 
  const updated = dao.update(project);
  if (updated) {
    res.status(200);
    res.send(updated);
  } else {
    res.status(404).send({ error: 'Project not found' });
  }
  res.end();
};

exports.delete = function (req, res, next) {
  const id = parseInt(req.params.id);
  const deleted = dao.delete(id);
  if (deleted) {
    res.status(200);
    res.send(deleted);
  } else {
    res.status(404).send({ error: 'Project not found' });
  }
  res.end();
};
