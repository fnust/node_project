import config from '../../config';
import { sessionRepo } from '../../model/repositories';
import { generateToken } from './helpers';
import {
  SessionCreateResponse,
  SessionGetProvidedResponse,
  SessionInput,
  DeleteResponse
} from './types';
import Jwt from '@hapi/jwt';
export default class SessionService {

  public async createSession(userParams: SessionInput): Promise<SessionCreateResponse> {
    const tokenAccess = generateToken({
      payload: {
        userId: userParams.userId,
        role: userParams.role,
      },
      ttlSec: 60 * 30,
      key: config.sessions.token.accessSecret,
    })
    const tokenRefresh = generateToken({
      payload: {
        userId: userParams.userId,
        role: userParams.role,
      },
      ttlSec: 60 * 60 * 24 * 30,
      key: config.sessions.token.refreshSecret,
    })

    const res = await sessionRepo.create(tokenRefresh, tokenAccess);
    if(!res) {
      return {
        errorMessage: 'Ошибка при создании токена',
      }
    }

    return {
      errorMessage: '',
      result: {
        tokenRefresh,
        tokenAccess,
      }
    }
  }

  public getProvidedCredentials(token: string, key: string): SessionGetProvidedResponse {
    try {
      const artifacts = Jwt.token.decode(token);
      Jwt.token.verify(artifacts, key);
      const userId = artifacts.decoded.payload.user.userId;
      const role = artifacts.decoded.payload.user.role;
      return {
        errorMessage: '',
        result: {
          userId,
          role,
        }
      };
    } catch (e) {
      return {
        errorMessage: 'Verification failed',
      }
    }
  }

  public async deleteSession(token: string, tokenAlias: 'tokenAccess' | 'tokenRefresh'): Promise<DeleteResponse> {
    const res = await sessionRepo.deleteByToken(token, tokenAlias);
    if (!res) {
      return {
        errorMessage: 'Ошибка при удалении сессии',
      }
    }
    return {
      errorMessage: '',
      result: res,
    }
  }
}
