const { PORT = 3000 } = process.env;
const JWT_SECRET = '5fb40adfd86a6be9c48b0b04335b688f8a1ab09d525f7c6799c51e6572080291';
const DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb'; const SALT_ROUNDS = 10;
module.exports = {
  PORT, JWT_SECRET, DB_ADDRESS, SALT_ROUNDS,
};
