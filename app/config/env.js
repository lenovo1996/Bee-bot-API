const env = {
    database: 'app',
    username: 'admin',
    password: '123456',
    host: '172.18.0.2',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;