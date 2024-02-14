import env from '../config/env';

const knexkfile = {
  client: 'mysql2',
  connection: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    database: env.DATABASE,
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
  },

  pool: {
    min: 2,
    max: 10,
  },

  migrations: {
    tableName: 'knex_migrations',
  },
};

export default knexkfile;
