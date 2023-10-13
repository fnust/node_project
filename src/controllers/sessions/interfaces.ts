import { Decorate } from '../common/types';

interface RefreshParams {
  tokenRefresh: string,
}

interface LogoutParams {
  tokenAccess: string,
}

export type RefreshPayload = Decorate<{ payload: RefreshParams }>;
export type LogoutPayload = Decorate<{ payload: LogoutParams }>;