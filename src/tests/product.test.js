const request = require('supertest');
const app = require('../app');
require('../models')

let id;
let token;

beforeAll(async() => {
    const credentials = {
        email: 'test@gmail.com',
        password: 'test',
    }
    const res = await request(app).post('/users/login').send(credentials);
    token =  res.body.token;
});

test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => { 
    const product = {
        title : "LG Smart Tv",
        description: "Smart Tv",
        brand: "LG",
        price: 900.00
    }
    const res = await request(app)
    .post('/products')
    .send(product)
    .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(product.title);
    expect(res.body.id).toBeDefined()
 });

 test('DELETE /products/:id ', async () => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
 });