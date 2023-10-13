import { ServiceResponse } from '../common/index';

interface SessionOutput {

  tokenRefresh: string,
  tokenAccess: string,
}

export interface SessionInput {

  userId: string,
  role: string,
}

export interface TokenInput {

  payload: SessionInput,
  ttlSec: number, // in seconds
  key: string,
}

export type SessionCreateResponse = ServiceResponse<SessionOutput>;
export type SessionGetProvidedResponse = ServiceResponse<SessionInput>;
export type DeleteResponse = ServiceResponse<boolean>;