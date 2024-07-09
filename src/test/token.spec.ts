import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import {describe, it , test,beforeEach, expect} from '@jest/globals'

import * as Test from "bun:test"

import { TokenService } from '../service/token.service'


let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  })


describe('Token Generation', () => {
  it('token expires at the correct time', () => {
    const user = { id: uuidv4(), email: 'test@example.com' };
    const token = TokenService.generateAccessToken(user.id, '1h')
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    expect(decoded.exp).toBeDefined();
    expect(decoded.exp! - decoded.iat!).toBe(3600); // Assuming 1 hour expiration
  });

  it('token contains correct user details', () => {
    const user = { id: uuidv4(), email: 'test@example.com' };
    const token = TokenService.generateAccessToken(user.id, '1h')
    const decoded = jwt.decode(token) as jwt.JwtPayload;
  expect(decoded.exp).toBeDefined();
    expect(decoded.exp! - decoded.iat!).toBe(3600); // Assuming 1 hour expiration
  });

  it('token contains correct user details', () => {
    const user = { id: uuidv4(), email: 'test@example.com' };
    const token = TokenService.generateAccessToken(user.id, '1h')
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    expect(decoded.userId).toBe(user.id);
  });
});