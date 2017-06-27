'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Student = require('../model/students.js');

let studentsRouter = module.exports = new Router();

studentsRouter.post('/api/students', jsonParser, (req, res, next) => {
  console.log('hit POST /api/students');

  new Student(req.body)
  .save()
  .then(student => res.json(student))
  .catch(next);
});

studentsRouter.get('/api/students/:id', (req, res, next) => {
  console.log('hit GET /api/students/:id');
  Student.findById(req.params.id)
  .then(student => res.json(student))
  .catch(next);
});

studentsRouter.put('/api/students/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/students/:id');

  let options = {
    runValidators: true,
    new: true,
  };
  Student.findByIdAndUpdate(req.params.id, req.body, options)
  .then(student => res.json(student))
  .catch(next);
});

studentsRouter.delete('/api/students/:id', (req, res, next) => {
  console.log('hit DELETE /api/students/:id');
  Student.findByIdAndRemove(req.params.id)
  .then(() => res.send(204))
  .catch(next);
});
