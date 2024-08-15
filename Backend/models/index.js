const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestaoestoquedb', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { main, sequelize };
