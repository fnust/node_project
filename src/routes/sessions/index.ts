import Hapi from '@hapi/hapi';
import {
  schemaRefresh,
  schemaLogout,
} from './schema';
import sessionController from '../../controllers/sessions/index';

const SessionRoutes: Hapi.ServerRoute[] = [
  {
    path: '/api/refresh',
    method: 'POST',
    options: {
      auth: false,
      validate: {
        payload: schemaRefresh,
      },
      handler: sessionController.refreshSession,
    }
  },
  {
    path: '/api/logout',
    method: 'POST',
    options: {
      auth: false,
      validate: {
        payload: schemaLogout
      },
      handler: sessionController.logout,
    }
  }
]

export default SessionRoutes;