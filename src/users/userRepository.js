const { AppDataSource } = require('../models/data_source');

const createUser = async (email, password, nickname) => {
  await AppDataSource.query(
    `
        INSERT INTO users (
        email, 
        password,
        nickname) VALUE (
        ?,?,?)`,
    [email, password, nickname]
  );
};

const getUserByEmail = async (email) => {
  const [user] = await AppDataSource.query(
    `
    SELECT id, email, password FROM users WHERE email = ?
    `,
    [email]
  );
  return user;
};

module.exports = { createUser, getUserByEmail };
