
const request = require('supertest');
const app = require('../app');

let token; 

beforeAll(async () => {
    const credentials = {
        email: 'test@gmail.com',
        password: 'test',
    }
    const res = await request(app).post('/users/login').send(credentials);
   token =  res.body.token;
});


test('GET /categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories', async () => { 
    const category = { name: "Tvs" }
    const res = await request(app)
    .post('/categories')
    .set('Authorization', ` Bearer ${token} `)
    .send(category);
id = res.body.id;
expect(res.status).toBe(201);
expect(res.body.name).toBe(category.name);
expect(res.body.id).toBeDefined();
 });

test('DELETE /categories/:id', async () => { 
    const res = await request(app)
    .delete(`/categories/${id}`)
    .set('Authorization', ` Bearer ${token} `);
    console.log(res.body);
expect(res.status).toBe(204);
 });