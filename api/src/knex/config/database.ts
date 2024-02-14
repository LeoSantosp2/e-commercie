import Knex from 'knex';

import knexkfile from '../knexfile';

const knex = Knex(knexkfile);

export default knex;
