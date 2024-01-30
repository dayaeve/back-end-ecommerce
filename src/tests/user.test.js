
const request = require('supertest');
const app = require('../app');

let id;
let token;

// ENDPOINTS PUBLICOS

 test('POST /users', async () => { 
    const user = {
        firstName: "cristian",
        lastName: "torres",
        email: "cristiantorres@gmail.com",
        password: "cristian",
        phone: "12345678",
    } 
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.id).toBeDefined();
  });

  test('POST /users/login', async () => { 
    const credentials = {
        email: "cristiantorres@gmail.com",
        password: "cristian",
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(credentials.email)
    expect(res.body.token).toBeDefined();
   });


   //ENDPOINTS PROTEGIDOS

   test('GET /users', async () => { 
    const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

   test('POST /users/login con credenciales incorrectas', async () => { 
    const credentials = {
        email: "incorrecto@gmail.com",
        password: "incorrecto",
    }
    const res = await request(app)
    .post('/users/login')
    .send(credentials);
    expect(res.status).toBe(401);

    })

  test('PUT /users/:id', async () => {
    const userUpdated = {
        firstName: "cristian actualizado"
    }
    const res = await request(app)
    .put(`/users/${id}`)
    .send(userUpdated)
    .set('Authorization', `Bearer ${token}`)
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName);
  });

  test('DELETE /users/:id' , async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
  });