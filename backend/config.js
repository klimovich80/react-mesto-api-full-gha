const { PORT = 3000 } = process.env;
const JWT_SECRET = '5fb40adfd86a6be9c48b0b04335b688f8a1ab09d525f7c6799c51e6572080291';
const DB_ADDRESS = 'mongodb://localhost:27017/mestodb';
const tokenAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkOTkzMTdlNGI5OWQ4MGViNWU5ODEiLCJpYXQiOjE2ODU5NTMxODQsImV4cCI6MTY4NjU1Nzk4NH0.MdVCYy3rIMMftkMTZ0yf6sog6A5_-7RPIo_HJNPqXPM';
const SALT_ROUNDS = 10;
module.exports = {
  PORT, JWT_SECRET, DB_ADDRESS, tokenAuth, SALT_ROUNDS,
};
