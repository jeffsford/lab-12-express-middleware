'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Student = require('../model/students.js');

let tempStudent;
const API_URL = process.env.API_URL;

describe('testing students routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/students', () => {
    after(() => Student.remove({}));

    let data = {
      name: 'Johnny Utah',
      age: '26',
      gender: 'male',
    };

    it('should respond with a student and 200 status', () => {
      return superagent.post(`${API_URL}/api/students`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual(data.name);
        expect(res.body.age).toEqual(data.age);
        expect(res.body.gender).toEqual(data.gender);
      });
    });
    it('should reply with a 400', () => {
      return superagent.post(`${API_URL}/api/students`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 409', () => {
      return superagent.post(`${API_URL}/api/students`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('test GET /api/students/:id', () => {
    afterEach(() => Student.remove({}));
    beforeEach(() => {
      return new Student({
        name: 'Johnny Utah',
        age: '26',
        gender: 'male',
      })
      .save()
      .then(student => {
        tempStudent = student;
      });
    });
    it('should respond with a student', () =>  {
      superagent.get(`${API_URL}/api/students/${tempStudent._id}`)
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body._id).toEqual(tempStudent._id);
      expect(res.body.name).toEqual(tempStudent.name);
      expect(res.body.age).toEqual(tempStudent.age);
      expect(res.body.gender).toEqual(tempStudent.gender);
    });
    });

    it('should respond with a 404', () => {
      superagent.get(`${API_URL}/api/students/4`)
      .then(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('test PUT /api/students/:id', () => {
    afterEach(() => Student.remove({}));
    beforeEach(() => {
      return new Student({
        name: 'Johnny Utah',
        age: '26',
        gender: 'male',
      })
      .save()
      .then(student => {
        tempStudent = student;
      });
    });

    it('should respond with an updated student', () => {
      return superagent.put(`${API_URL}/api/students/${tempStudent._id}`)
      .send({gender: 'drama'})
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempStudent._id);
        expect(res.body.name).toEqual(tempStudent.name);
        expect(res.body.age).toEqual(tempStudent.age);
        expect(res.body.gender).toEqual('drama');

      });
    });
    it('should respond with a student', () => {
      return superagent.put(`${API_URL}/api/students/${tempStudent._id}`)
      .send({})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 404', () => {
      superagent.put(`${API_URL}/api/students/4`)
      .then(err => {
        expect(err.status).toEqual(404);
      });
    });
  });
  describe('test DELETE /api/students/:id', () => {
    afterEach(() => Student.remove({}));
    beforeEach(() => {
      return new Student({
        name: 'Johnny Utah',
        age: '26',
        gender: 'male',
      })
      .save()
      .then(student => {
        tempStudent = student;
      });
    });

    it('should delete a student', () => {
      return superagent.delete(`${API_URL}/api/students/${tempStudent._id}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
    it('bad id should respond with a 404', () => {
      return superagent.delete(`${API_URL}/api/students/5`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
