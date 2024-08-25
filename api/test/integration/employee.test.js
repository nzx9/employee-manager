const request = require('supertest');
const { sequelize } = require('../../models');
const app = require('../../app');

// beforeAll(async () => {
//   await sequelize.sync({ alter: true });
// });

afterAll(async () => {
  await sequelize.close();
});

describe('Employee API', () => {
  it('should create a new employee', async () => {
    const response = await request(app)
      .post('/employee')
      .send({
        firstName: 'Navindu',
        lastName: 'Dananga',
        email: 'navindumd@gmail.com',
        phoneNumber: '+94712345678',
        gender: 'M',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.firstName).toBe('John');
  });

  it('should not create an employee with invalid data', async () => {
    const response = await request(app)
      .post('/employee')
      .send({
        firstName: 'Navi',
        lastName: 'Dana',
        email: 'navindumd.gmail.com',
        phoneNumber: '1234567890',
        gender: 'M',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should return a list of employees', async () => {
    const response = await request(app).get('/employee');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update an existing employee', async () => {
    const employee = await request(app)
      .post('/employee')
      .send({
        firstName: 'Navindu',
        lastName: 'Dananga',
        email: 'navindumd@gmail.com',
        phoneNumber: '+94712345679',
        gender: 'M',
      });

    const response = await request(app)
      .put(`/employee/${employee.body.id}`)
      .send({
        firstName: 'Navindu',
        lastName: 'Madanayaka',
        email: 'navindumd@gmail.com',
        phoneNumber: '+94712345670',
        gender: 'M',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe('Janet');
  });

  it('should delete an existing employee', async () => {
    const employee = await request(app)
      .post('/employee')
      .send({
        firstName: 'Navindu',
        lastName: 'Dananga',
        email: 'navindumd@gmail.com',
        phoneNumber: '+94712345679',
        gender: 'M',
      });

    const response = await request(app)
      .delete(`/employee/${employee.body.id}`);

    expect(response.statusCode).toBe(204);
  });
});