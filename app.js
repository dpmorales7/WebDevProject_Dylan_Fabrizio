
require('dotenv').config();
// app.js  –  DevPortfolio Hub  –  Node.js Express Server
// CS 456 Web Programming – Assignment #5

const express = require('express');
const path = require('path');

const projectCtrl = require('./controller/ProjectControllerMongo');

const app  = express();
const PORT = process.env.PORT || 4000;

//  midware
app.use(express.json());

// server
app.use(express.static(path.join(__dirname, 'public_html')));

// rest api for projects
app.get   ('/api/projects',      projectCtrl.getAll);
app.get   ('/api/projects/:id',  projectCtrl.getOne);
app.post  ('/api/projects',      projectCtrl.create);
app.put   ('/api/projects/:id',  projectCtrl.update);
app.delete('/api/projects/:id',  projectCtrl.delete);

// error handling
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// server start
app.listen(PORT, () => {
  console.log(`DevPortfolio Hub running at http://localhost:${PORT}`);
});

module.exports = app;


//old app below

/*
// app.js  –  DevPortfolio Hub  –  Node.js Express Server
// CS 456 Web Programming – Assignment #3
 
const express = require('express');
const path = require('path');
 
const projectCtrl = require('./controller/ProjectController');
 
const app = express();
const PORT = process.env.PORT || 4000; 
 
//  mid ware
app.use(express.json());
 
// static server
// Serve everything in the public_html as static files
app.use(express.static(path.join(__dirname, 'public_html')));
 
// rest api
app.get('/api/projects',     projectCtrl.getAll);
app.get('/api/projects/:id', projectCtrl.getOne);
app.post('/api/projects',    projectCtrl.create);
app.put('/api/projects/:id', projectCtrl.update);
app.delete('/api/projects/:id', projectCtrl.delete);

 
// start server
app.listen(PORT, () => {
  console.log(`DevPortfolio Hub running at http://localhost:${PORT}`);
});
*/
