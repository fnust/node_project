import sessionRoutes from './sessions';
import { userRoutes } from './user';

export default [...sessionRoutes, ...userRoutes];
