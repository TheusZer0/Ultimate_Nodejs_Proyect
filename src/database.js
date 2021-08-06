//modules postgresql
const pg = require('pg');
const pg_pool = pg.Pool;
const pool = new pg_pool({
    host: 'localhost',
    user: 'postgres',
    password: 'usm-charapter',
    database: 'ayds_proyect_usm',
    port: '5432'
});
module.exports = pool;
