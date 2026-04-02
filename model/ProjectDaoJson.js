// ProjectDaoJson.js
// Dao for projects
 
const fs = require('fs');
const path = require('path');
 
const DATA_FILE = path.join(__dirname, 'projects.json');
 
// load projects from json
exports.lstProjects = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(exports.lstProjects, null, 2), 'utf8');
}

function pos(id) {
    for (let i = 0; i < exports.lstProjects.length; i++) {
        if (exports.lstProjects[i]._id === id) { return i; }
    }
    return -1;
}
 
exports.readAll = function () {
  return exports.lstProjects;
};
 
exports.read = function (id) {
  let index = pos(id);
  if (index >= 0) {
    return exports.lstProjects[index];
  } return null;
};

exports.create = function (project) {
    if (exports.lstProjects.length === 0) {
        project._id = 1;
    } else {
        project._id = exports.lstProjects[exports.lstProjects.length - 1]._id + 1;
    }
    exports.lstProjects.push(project);
    save();
};

exports.update = function (project) {
    let index = pos(project._id);
    if (index < 0) { return null; }
    exports.lstProjects[index] = project;
    save();
    return exports.lstProjects[index];
};

exports.delete = function (id) {
    let index = pos(id);
    let project = null;
    if (index >= 0) {
        project = exports.lstProjects[index];
        exports.lstProjects.splice(index, 1);
        save();
    }
    return project;
};
