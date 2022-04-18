const { expect } = require('chai');
const request = require('supertest');
const app = require('./app');

const FAQData = require('./pageData/FAQData');
const GeneralHealthData = require('./pageData/GeneralHealthData');
const LifestyleData = require('./pageData/LifestyleData');
const MedicalCondData = require('./pageData/MedicalCondData');
const MedicalTreatData = require('./pageData/MedicalTreatData');
const MedicationData = require('./pageData/MedicationData');
const STDData = require('./pageData/STDData');
const TravelData = require('./pageData/TravelData');
const WholeBloodQuestions = require('./quizQuestions/WholeBloodQuestions');
const PowerRedQuestions = require('./quizQuestions/PowerRedQuestions');
const PlateletQuestions = require('./quizQuestions/PlateletQuestions');
const PlasmaQuestions = require('./quizQuestions/PlasmaQuestions');

describe('Test user login and registration', () => {
  const formData = { username: 'bla', password: 'wrong' }; // mock form data with incorrect credentials
  describe('POST /login with incorrect username/password', () => {
    it('it should return a 401 HTTP response code', (done) => {
      request(app)
        .post('/login')
        .send(formData)
        .expect(401)
        .then(() => {
          done();
        });
    });
  });

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

  describe('POST /createaccount -----> test user registration user already has account', () => {
    it('it should return a 401 HTTP response code', (done) => {
      const user = {
        firstName: 'Rachel',
        lastName: 'Kindagen',
        email: 'rmk461@nyu.edu',
        password: 'helloworld123',
        age: 21,
        eligible: [],
      };

      request(app)
        .post('/createaccount')
        .send(user)
        .expect(401)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });

  describe('GET /logout', () => {
    it('it should return a 200 HTTP response code', (done) => {
      request(app)
        .get('/logout')
        .expect(200)
        .then(() => {
          done();
        })
        .catch(done);
    });
  });

  describe('GET /FAQ ----->get FAQ Data', () => {
    it('it should return a 200 HTTP response code', () => {
      request(app)
        .get('/FAQ')
        .expect(200)
        .then((response) => {
          expect(response.body.FAQData).equal(FAQData);
        });
    });
  });

  describe('GET /FAQ/eligibility ----->get eligibility data', () => {
    it('it should return a 200 HTTP response code', () => {
      request(app)
        .get('/FAQ/eligibility')
        .expect(200)
        .then((response) => {
          expect(response.body.GeneralHealthData).equal(GeneralHealthData);
          expect(response.body.LifestyleData).equal(LifestyleData);
          expect(response.body.MedicalCondData).equal(MedicalCondData);
          expect(response.body.MedicalTreatData).equal(MedicalTreatData);
          expect(response.body.MedicationData).equal(MedicationData);
          expect(response.body.STDData).equal(STDData);
          expect(response.body.TravelData).equal(TravelData);
        });
    });
  });

  describe('GET /finddonationsite ----->get donation site map overlay questions', () => {
    it('it should return a 200 HTTP response code', () => {
      request(app)
        .get('/FAQ/eligibility')
        .expect(200)
        .then((response) => {
          expect(response.body.WholeBloodQuestions).equal(WholeBloodQuestions);
          expect(response.body.PowerRedQuestions).equal(PowerRedQuestions);
          expect(response.body.PlateletQuestions).equal(PlateletQuestions);
          expect(response.body.PlasmaQuestions).equal(PlasmaQuestions);
        });
    });
  });
});
