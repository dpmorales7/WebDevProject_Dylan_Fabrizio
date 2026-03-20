/ ProjectDaoJson.js
// Dao for projects
 
const fs = require('fs');
const path = require('path');
 
const DATA_FILE = path.join(__dirname, 'projects.json');
 
// load projects from json
let lstProjects = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
 
exports.readAll = function () {
  return lstProjects;
};
 
exports.read = function (id) {
  return lstProjects.find(p => p._id === id) || null;
};
 
