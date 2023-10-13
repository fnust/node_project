import * as Hapi from '@hapi/hapi';
import plugins from './plugins';
import routes from '../routes';
import dataSource from '../ormconfig';
import { config } from 'dotenv';

config();

const init = async () => {
  try {
    const server: Hapi.Server = Hapi.server({
      port: Number(process.env.SERVER_PORT),
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    await server.register(plugins);

    server.route(routes);

    await server.start();

    await dataSource.initialize();
    await dataSource.runMigrations();

    console.log(`Server running on ${server.info.uri}`);
  } catch (e) {
    console.log('Error while initialising server');
    console.error(e);
  }
};

export default init;
