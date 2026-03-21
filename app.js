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
 
// start server
app.listen(PORT, () => {
  console.log(`DevPortfolio Hub running at http://localhost:${PORT}`);
});
