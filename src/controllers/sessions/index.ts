import * as Hapi from '@hapi/hapi';
import { RefreshPayload, LogoutPayload } from './interfaces';
import { sessionService } from '../../services';
import Boom from '@hapi/boom';
import config from '../../config';

class SessionController {
  async refreshSession(request: RefreshPayload, h: Hapi.ResponseToolkit) {
    const { tokenRefresh } = request.payload;

    const cred = sessionService.getProvidedCredentials(
      tokenRefresh,
      config.sessions.token.refreshSecret
    );

    if (!cred.result) {
      return Boom.badRequest(cred.errorMessage);
    }

    const { userId, role } = cred.result;

    const sess = await sessionService.createSession({
      userId,
      role,
    });
    if (!sess.result) {
      return Boom.badRequest(sess.errorMessage);
    }

    return { id: cred.result.userId, ...sess.result };
  }

  async logout(request: LogoutPayload, h: Hapi.ResponseToolkit) {
    const tokenAccess = request.payload.tokenAccess;

    const deleted = await sessionService.deleteSession(
      tokenAccess,
      'tokenAccess'
    );
    if (!deleted.result) {
      console.log(deleted.errorMessage);
      return Boom.internal();
    }
    return 'Logged out!';
  }
}

export default new SessionController();
