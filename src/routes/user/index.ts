import UserController from '../../controllers/user';
import userSchema from './shema';

import { ServerRoute } from '@hapi/hapi';

export const userRoutes: ServerRoute[] = [
  {
    path: '/api/registration',
    method: 'POST',
    options: {
      description: 'Маршрут регистрации пользователя',
      notes:
        'Принимает данные для регистрации - имя, дату рождения, почту, пароль.' +
        'По ним создаёт обычного пользователя.' +
        'Возвращает данные пользователя (имя, почту, дату рождения)' +
        'и токены авторизации.',
      validate: userSchema.registrationSchema,
      tags: ['api', 'user'],
      handler: UserController.registrationUser,
    },
  },
  {
    path: '/api/login',
    method: 'POST',
    options: {
      description: 'Маршрут логина',
      notes:
        'Принимает email и password в теле запроса.' +
        'Возвращает данные пользователя (имя, почту, дату рождения)' +
        'и токены авторизации',
      validate: userSchema.authorizationSchema,
      tags: ['api', 'user'],
      handler: UserController.authorizationUser,
    },
  },
];
