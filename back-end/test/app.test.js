
const { expect } = require('chai');
const request = require('supertest');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const app = require('../app');




const { faqData } = require('../models/FAQData');
const { generalhealthData } = require('../models/GeneralHealthData');
const { lifestyleData } = require('../models/LifestyleData');
const { medicalcondData } = require('../models/MedicalCondData');
const { medicaltreatData } = require('../models/MedicalTreatData');
const { medicationData } = require('../models/MedicationData');
const { travelData } = require('../models/TravelData');
const { stdData } = require('../models/STDData');

const { wholebloodquestions } = require('../models/WholeBloodQuestions');
const { powerredquestions } = require('../models/PowerRedQuestions');
const { plateletquestions } = require('../models/PlateletQuestions');
const { plasmaquestions } = require('../models/PlasmaQuestions');

const { jwtOptions, jwtStrategy } = require("../jwt-config") // import setup options for using JWT in passport

const token = jwt.sign({ _id: "6254c1a80156ae71c43b51a3" }, jwtOptions.secretOrKey)






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

  it('POST /login ------> test user login', (done) =>

    request(app)
      .post('/login')
      .send({
        email: 'rmk461@nyu.edu',
        password: 'helloworld123',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.email).equal('rmk461@nyu.edu');
 

      }).then(done()));

  
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
          expect(response.body.FAQData).equal(faqData);
        });
    });
  });

  describe('GET /FAQ/eligibility ----->get eligibility data', () => {
    it('it should return a 200 HTTP response code', () => {
      request(app)
        .get('/FAQ/eligibility')
        .expect(200)
        .then((response) => {
          expect(response.body.GeneralHealthData).equal(generalhealthData);
          expect(response.body.LifestyleData).equal(lifestyleData);
          expect(response.body.MedicalCondData).equal(medicalcondData);
          expect(response.body.MedicalTreatData).equal(medicaltreatData);
          expect(response.body.MedicationData).equal(medicationData);
          expect(response.body.STDData).equal(stdData);
          expect(response.body.TravelData).equal(travelData);
        });
    });
  });

  describe('GET /finddonationsite ----->get donation site map overlay questions', () => {
    it('it should return a 200 HTTP response code', () => {
      request(app)
        .get('/FAQ/eligibility')
        .expect(200)
        .set("Authorization", `JWT ${token}`) 
        .then((response) => {
          expect(response.body.WholeBloodQuestions).equal(wholebloodquestions);
          expect(response.body.PowerRedQuestions).equal(powerredquestions);
          expect(response.body.PlateletQuestions).equal(plateletquestions);
          expect(response.body.PlasmaQuestions).equal(plasmaquestions);
        });
    });
  });

  after (() => {
    console.log(`Close`)
    process.exit(0)
  })
});
