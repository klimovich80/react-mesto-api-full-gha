const { PORT = 3000 } = process.env;
const DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb';
const SALT_ROUNDS = 10;
module.exports = {
  PORT, DB_ADDRESS, SALT_ROUNDS,
};
