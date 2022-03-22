const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('assignment_db', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });


module.exports = sequelize;