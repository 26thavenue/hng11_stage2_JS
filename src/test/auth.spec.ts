// import request from 'supertest';
// import app from '../index';
// import db from '../db/db';
// import { describe, it ,expect, beforeAll, afterAll } from "bun:test";

// describe('Auth Endpoints', () => {
//   beforeAll(async () => {
//     await db.$connect();
//     await db.user.delete({ where: { email: "john.doe@example.com" } });
//   });

//   afterAll(async () => {
//     await db.$disconnect();
//   });

//   describe('POST /auth/register', () => {
//     it('should register user successfully with default organisation', async () => {
//       const res = await request(app)
//         .post('/auth/register')
//         .send({
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john.doe@example.com',
//           password: 'password123',
//           phone: '1234567890',
//         });

//       expect(res.statusCode).toEqual(201);
//       expect(res.body.status).toBe('success');
//       expect(res.body.data.user.firstName).toBe('John');
//       expect(res.body.data.user.lastName).toBe('Doe');
//       expect(res.body.data.user.email).toBe('john.doe@example.com');
//       expect(res.body.data.accessToken).toBeDefined();
//       expect(res.body.data.user)
//     });

//     it('should fail if email is already in use', async () => {
//       const res = await request(app)
//         .post('/auth/register')
//         .send({
//           firstName: 'Jane',
//           lastName: 'Doe',
//           email: 'john.doe@example.com',
//           password: 'password123',
//           phone: '1234567890',
//         });

//       expect(res.statusCode).toEqual(422);
//       expect(res.body.status).toBe('Bad Request');
//       expect(res.body.message).toBe('Registration unsuccessful');
//     });


//     it('should fail if email is already in use', async () => {
//       const res = await request(app)
//         .post('/auth/register')
//         .send({
//           firstName: 'Jane',
//           lastName: 'Doe',
//           email: 'john.doe@example.com',
//           password: 'password123',
//           phone: '1234567890',
//         });

//       expect(res.statusCode).toEqual(422);
//       expect(res.body.status).toBe('Bad Request');
//       expect(res.body.message).toBe('Registration unsuccessful');
//     });
//   });
// });
