const request = require('supertest');
const app = require('../app');
require('../models');

let token;
let id;

beforeAll(async () => {
    const credentials = {
        email: "test@gmail.com",
        password: "test",
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token
});

test('GET /cart', async () => { 
    const res = await request(app)
    .get('/cart')
    .set('Authorization', `Bearer ${token}`)
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
 });

 test('POST / cart', async () => {
    const productcart = {
        quantity: 3,
    }
    const res = await request(app)
    .post('/cart')
    .send(productcart)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(productcart.quantity);
    expect(res.body.id).toBeDefined();
 });

 test('DELETE /cart/:id', async () => { 
    const res = await request(app)
    .delete(`/cart/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  })

