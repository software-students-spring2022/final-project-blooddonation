const { expect } = require('chai');
const request = require('supertest');
const app = require('./app');

describe('Test user login and registration', () => {
  it('POST /login ------> test user login', () =>
    request(app)
      .post('/login')
      .send({
        email: 'rmk461@nyu.edu',
        password: 'helloworld123',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.email).equal('rmk461@nyu.edu');
      }));

  it('POST /createaccount -----> test user registration', () => {
    const user = {
      firstName: 'Rachel',
      lastName: 'Kindagen',
      email: 'rmk461@nyu.edu',
      password: 'helloworld123',
      age: 21,
      eligible: [],
    };

    return request(app)
      .post('/createaccount')
      .send(user)
      .expect(200)
      .then((response) => {
        expect(response.body.email).equal('rmk461@nyu.edu');
        expect(response.body.age).above(20);
      });
  });
});
