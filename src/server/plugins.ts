import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import { plugin as Jwt } from '@hapi/jwt';
import { config } from 'dotenv';

config();

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'API Documentation',
  },
  grouping: 'tags',
  sortEndpoints: 'method',
  produces: ['application/json'],
  jsonPath: '/documentation.json',
  documentationPath: '/api/documentation',
  schemes: ['http', 'https'],
  debug: true,
  security: [{ Bearer: [] }],
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  {
    plugin: Jwt,
  },
];

export default plugins;
