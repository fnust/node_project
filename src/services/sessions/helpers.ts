import Jwt from '@hapi/jwt';
import { TokenInput } from './types';

export function generateToken(params: TokenInput) {
  const token = Jwt.token.generate(
    {
      aud: 'urn:audience:project',
      iss: 'urn:issuer:project',
      group: 'users',
      user: params.payload,
    },
    {
      key: params.key,
      algorithm: 'HS256',
    },
    {
      ttlSec: params.ttlSec,
    }
  );
  return token;
}
