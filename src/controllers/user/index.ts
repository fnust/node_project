import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import { userRepo } from '../../model/repositories/';
import { sessionService } from '../../services/index';
import { RegistrationPayload, LoginPayload } from './interfases';
import { config } from 'dotenv';

config();

class UserController {
  static async registrationUser(
    request: RegistrationPayload,
    h: Hapi.ResponseToolkit
  ) {
    try {
      const { email, password, name, dateOfBirth } = request.payload;

      if (await userRepo.findByParam({ email: email })) {
        return Boom.badImplementation('address already exists');
      }

      const user = await userRepo.create(
        email,
        password,
        name,
        new Date(dateOfBirth),
        'user-regular'
      );

      if (!user) {
        return Boom.badImplementation('failed to create user');
      }

      const sessionData = await sessionService.createSession({
        userId: user.id,
        role: user.role,
      });
      if (!sessionData.result) {
        console.log(sessionData.errorMessage);
        return Boom.internal();
      }

      const tokenAccess = sessionData.result.tokenAccess;
      const tokenRefresh = sessionData.result.tokenRefresh;
      return h.response({
        email: user.email,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        tokenAccess: tokenAccess,
        tokenRefresh: tokenRefresh,
      });
    } catch (error) {
      console.error(error);
      return Boom.badImplementation('error');
    }
  }

  static async authorizationUser(
    request: LoginPayload,
    h: Hapi.ResponseToolkit
  ) {
    try {
      const { email, password }: any = request.payload;

      const user = await userRepo.findByParam({ email: email });

      if (!user) {
        return Boom.notFound('user not found');
      }

      if (!(await userRepo.checkPassword(user.password, password))) {
        return Boom.unauthorized('invalid password');
      }

      const sessionData = await sessionService.createSession({
        userId: user.id,
        role: user.role,
      });
      if (!sessionData.result) {
        console.log(sessionData.errorMessage);
        return Boom.internal();
      }

      const tokenAccess = sessionData.result.tokenAccess;
      const tokenRefresh = sessionData.result.tokenRefresh;

      return h.response({
        email: user.email,
        name: user.name,
        dateOfBirth: user.dateOfBirth,
        tokenAccess: tokenAccess,
        tokenRefresh: tokenRefresh,
      });
    } catch (error) {
      console.error(error);
      return Boom.badImplementation('error');
    }
  }
}

export default UserController;
