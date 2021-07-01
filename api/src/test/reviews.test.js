const supertest = require('supertest');
const {
  server,
} = require('../../index');

const api = supertest(server);

test('user created', async () => {
  const newUser = {
    id: 'asd12adsfasdfffasdffasssfsa',
    email: 'yoa@g22mail.com',
    displayName: 'yxo',
  };
  await api
    .post('/api/user')
    .send(newUser)
    .expect(201)
    .expect('Usuario creado correctamente!');
});

test('get users', async () => {
  await api
    .get('/api/user')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
