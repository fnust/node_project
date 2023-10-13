import { DataSource } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import Entities from './model/entities/';

dotenvConfig();

const host =
  process.env.DOCKER_USE === 'true'
    ? String(process.env.POSTGRES_HOST)
    : 'localhost';
export default new DataSource({
  type: 'postgres',
  host: host,
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DB),
  synchronize: true,
  cache: false,
  entities: [...Entities],
  migrations: [],
});
