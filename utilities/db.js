const Sequelize = require('sequelize');
const sequelize = new Sequelize('flight', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging:false,
  operatorsAliases: false
});
/**
 * 
 */
const User = sequelize.define('user', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_login: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
});

const Flight  = sequelize.define('flight', {
  source: Sequelize.STRING,
  destination: Sequelize.STRING(1000),
  travel_date: Sequelize.STRING,
  return_date: Sequelize.STRING,
  flight_no: Sequelize.STRING,
  airline_name: Sequelize.STRING,
  departure_time: Sequelize.STRING,
  arrival_time: Sequelize.STRING,
  no_of_stops: Sequelize.STRING,
  price: Sequelize.STRING,
});

User.sync({force: false});
Flight.sync({force: false});

module.exports = {User, Flight};
