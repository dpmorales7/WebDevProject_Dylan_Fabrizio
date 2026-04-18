// ProjectController.js
// Handles HTTP request / response for project endpoints.


const dao = require('../model/ProjectDaoMongo');

// GET  for api of projects
exports.getAll = async function (req, res, next) {
  try {
    const projects = await dao.readAll();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// GET for api of projects with id
exports.getOne = async function (req, res, next) {
  try {
    const project = await dao.read(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// POST for api of projects
exports.create = async function (req, res, next) {
  try {
    const created = await dao.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    //validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// PUT for api of projects and the id
exports.update = async function (req, res, next) {
  try {
    const updated = await dao.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// DELETE for api of projects with the id
exports.delete = async function (req, res, next) {
  try {
    const deleted = await dao.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(deleted);
  } catch (err) {
    next(err);
  }
};