// ProjectDaoMongo.js
// DAO for projects – uses MongoDB 


const mongoose = require('mongoose');
const db = require('./DbConnect');

//Schema ==================
const projectSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  owner:  { type: String, required: true },
  type:   { type: String, default: 'Web App' },
  stack:  { type: String, required: true },
  desc:   { type: String, required: true },
  img:    { type: String, default: '' },
  repo:   { type: String, default: '' },
});

//avoid override
const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);

// CRUD ====================

//Return every project 
exports.readAll = async function () {
  await db.connect();
  return Project.find({});
};

//Return one project by its _id string, or null if not found.
exports.read = async function (id) {
  await db.connect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Project.findById(id);
};


exports.create = async function (projectData) {
  await db.connect();
  const project = new Project(projectData);
  return project.save();
};


exports.update = async function (id, updates) {
    await db.connect();
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Project.findByIdAndUpdate(id, updates, { returnDocument: 'after', runValidators: true });
};

exports.delete = async function (id) {
  await db.connect();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Project.findByIdAndDelete(id);
};

// Extra features 

//Find all projects for given owner
exports.readByOwner = async function (owner) {
  await db.connect();
  return Project.find({ owner });
};

//Find all projects of a by given type
exports.readByType = async function (type) {
  await db.connect();
  return Project.find({ type });
};