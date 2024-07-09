// import {describe, mock } from "bun:test";
// import request from 'supertest';
// import { v4 as uuidv4 } from 'uuid';
// import {expect,test, beforeEach} from '@jest/globals'
// import app from '../index';
// import db from '../db/db';
// import { users } from '../schema';
// import { eq } from "drizzle-orm";

// const mockDb = {
//   user: {
//     findUnique: () => {},
//     create: () => {},
//   },
//   organisation: {
//     create: () => {},
//   },
// };

// // Mock the db in your app
// mock.module('../db/db', () => mockDb);

// describe('Auth Endpoints', () => {
//   beforeEach(async() => {
    
//     // await db.delete(users).where(eq(users.email, 'john.doe@example.com'));
//   });

//   describe('POST /auth/register', () => {
//     test('should register user successfully with default organisation', async () => {
//       const mockUser = {
//         id: uuidv4(),
//         firstName: 'Blanco',
//         lastName: 'Duran',
//         email: 'duran.blanco@gmail.com',
//         phone: '1234567890',
//       };

//       mockDb.user.findUnique = () => Promise.resolve(null);
//       mockDb.user.create = () => Promise.resolve(mockUser);
//       mockDb.organisation.create = () => Promise.resolve({ id: uuidv4(), name: "Blanco's Organisation" });

//       const res = await request(app)
//         .post('/auth/register')
//         .send({
//         id: uuidv4(),
//         firstName: 'Blanco',
//         lastName: 'Duran',
//         email: 'duran.blanco@gmail.com',
//         phone: '1234567890',
//       });

    

//       expect(res.status).toBe(201);
//       expect(res.body.status).toBe('success');
//       expect(res.body.data.user.firstName).toBe('Blanco');
//       expect(res.body.data.user.lastName).toBe('Duran');
//       expect(res.body.data.user.email).toBe('duran.blanco@gmail.com');
//       expect(res.body.data.accessToken).toBeDefined();
//       expect(res.body.data.user.id).toBeDefined();
//     });

//     test('should fail if email is already in use', async () => {
//       mockDb.user.findUnique = () => Promise.resolve({ id: uuidv4(), email: 'john.doe@example.com' });

//       const res = await request(app)
//         .post('/auth/register')
//         .send({
//           firstName: 'Jane',
//           lastName: 'Doe',
//           email: 'john.doe@example.com',
//           password: 'password123',
//           phone: '1234567890',
//         });

//       expect(res.status).toBe(422);
//       expect(res.body.status).toBe('Bad Request');
//       expect(res.body.message).toBe('Registration unsuccessful-Email already in Use');
//     });

//     test('should fail if required fields are missing', async () => {
//       const res = await request(app)
//         .post('/auth/register')
//         .send({
//           lastName: 'Doe',
//           email: 'jane.doe@example.com',
//           password: 'password123',
//         });

//       expect(res.status).toBe(422);
//       expect(res.body.status).toBe('Bad Request');
//       expect(res.body.message).toBe('Registration unsuccessful');
//       expect(res.body.errors).toContainEqual({
//         field: 'firstName',
//         message: expect.any(String)
//       });
//     });
//   });

//   describe('POST /auth/login', () => {
//     test('should log in user successfully', async () => {
//       const mockUser = {
//         id: uuidv4(),
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'john.doe@example.com',
//         password: '$2b$10$abcdefghijklmnopqrstuvwxyz', // hashed password
//       };

//       mockDb.user.findUnique = () => Promise.resolve(mockUser);

//       const res = await request(app)
//         .post('/auth/login')
//         .send({
//           email: 'john.doe@example.com',
//           password: 'password123',
//         });

//       expect(res.status).toBe(200);
//       expect(res.body.status).toBe('success');
//       expect(res.body.message).toBe('Login successful');
//       expect(res.body.data.accessToken).toBeDefined();
//       expect(res.body.data.user).toBeDefined();
//     });

//     test('should fail with invalid credentials', async () => {
//       mockDb.user.findUnique = () => Promise.resolve(null);

//       const res = await request(app)
//         .post('/auth/login')
//         .send({
//           email: 'john.doe@example.com',
//           password: 'wrongpassword',
//         });

//       expect(res.status).toBe(401);
//       expect(res.body.status).toBe('Bad Request');
//       expect(res.body.message).toBe('Authentication failed');
//     });
//   });
// });