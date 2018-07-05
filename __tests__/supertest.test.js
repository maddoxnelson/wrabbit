const request = require('supertest');
const app = require('../start');
const agent = require('superagent');

describe('Test the root path', () => {

  test('It should respond the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

})

// testuser@test.com
// testtest123

// describe('Test logging in a user', () => {
//
//   const testUser = {
//     email: "testuser@test.com",
//     password: "testtest123"
//   }
//
//   test('It should log in a user', async () => {
//     console.log(testUser)
//     const loggedInUser = await request(app).post('/login', testUser);
//
//
//
//     expect(loggedInUser.statusCode).toBe(200) // this gonna break
//   })
// })
