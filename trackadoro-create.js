#!/usr/bin/env node

var db = require('./db.js');
var clients = require('./db/client');
var projects = require('./db/project');
var tasks = require('./db/task');
var program = require('commander');

program
    .command('client <name>')
    .alias('c')
    .action(createClient);

program
  .command('project <name>')
  .option('-c, --client <client-name>', 'add to a client by name')
  .alias('p')
  .action(createProject);

program
  .command('task <name>')
  .option('-p, --project <project-name>', 'add to a project by name')
  .alias('t')
  .action(createTask);

program.parse(process.argv);

////////////////////////////////////////////////////////////////////////////////

function createClient(name) {
  clients.addClient(name);
}

function createProject(name, options) {
  if (options.client) {
    clients.getClientByName(options.client)
      .then(clientId => projects.addProject(name, clientId));
  } else {
    projects.addProject(name);
  }
}

function createTask(name, options) {
  if (options.project) {
    projects.getProjectByName(options.project)
      .then(projectId => tasks.addTask(name, projectId));
  } else {
    tasks.addTask(name);
  }
}
