// import jwt from 'jsonwebtoken';
// import { TokenService } from '../service/token.service'
// import { expect, test, describe, mock, it,  beforeEach } from "bun:test";


// let tokenService: TokenService;

//   beforeEach(() => {
//     tokenService = new TokenService();
//   })


// describe('Access Token Generation', () => {

  
//    test('should generate a token that expires at the correct time', () => {
//       const userId = "1";
//       const expirationTime = '1h';
//       const token = TokenService.generateAccessToken(userId, expirationTime);
//       const decoded = jwt.decode(token) as jwt.JwtPayload;
      
//       const currentTime = Math.floor(Date.now() / 1000);
//       const expectedExpirationTime = currentTime + 3600; // 1 hour in seconds

//       expect(decoded.exp).toBeDefined();
//       expect(decoded.exp).toBeGreaterThan(currentTime);
//       expect(decoded.exp).toBeLessThanOrEqual(expectedExpirationTime + 1); // Allow 1 second tolerance
//     });

//   test('should contain correct user details in the token', () => {
//       const userId = "1";
//       const expirationTime = '1h';
//       const token = TokenService.generateAccessToken(userId, expirationTime);
//       const decoded = jwt.decode(token) as jwt.JwtPayload;

//       expect(decoded.userId).toBe(userId);
//     });
// });

// describe('Refresh Token Generation', () => {

//     test('should generate a token that expires at the correct time', () => {
//       const userId = "1";
//       const expirationTime = '7d';
//       const token = TokenService.generateRefreshToken(userId, expirationTime);
//       const decoded = jwt.decode(token) as jwt.JwtPayload;
      
//       const currentTime = Math.floor(Date.now() / 1000);
//       const expectedExpirationTime = currentTime + 7 * 24 * 3600; // 7 days in seconds

//       expect(decoded.exp).toBeDefined();
//       expect(decoded.exp).toBeGreaterThan(currentTime);
//       expect(decoded.exp).toBeLessThanOrEqual(expectedExpirationTime + 1); // Allow 1 second tolerance
//     });

//     test('should contain correct user details in the token', () => {
//       const userId = "1";
//       const expirationTime = '1h';
//       const token = TokenService.generateAccessToken(userId, expirationTime);
//       const decoded = jwt.decode(token) as jwt.JwtPayload;

//       expect(decoded.userId).toBe(userId);
//     });

//   })