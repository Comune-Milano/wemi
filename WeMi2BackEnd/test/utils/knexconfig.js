module.exports = {
  test: {
    knex: {
      client: 'pg',
      searchPath: ['wemi2'],
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'admin',
        database: 'wemi_test'
      },
      migrations: {
        directory: ['./src/migrations/create_table','./src/migrations/modify','./src/migrations/sequence'],
        tableName: 'wemi2',
      },
      seeds: {
        directory: './test/seeds',
        tableName: 'wemi2',
      },
      pool: {
        min: 0,
        max: 7
      },
    },
    dbManager: {
      // db manager related configuration
      superUser: 'postgres',
      superPassword: 'admin',
      populatePathPattern: './test/seeds', // glob format for searching seeds
    },
  }
};