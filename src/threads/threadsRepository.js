const { AppDataSource } = require('../models/data_source');

const createThreads = async (user_id, title, content) => {
  await AppDataSource.query(
    `
        INSERT INTO threads (
        user_id,
        title,
        content
        ) VALUE (
         ?,
         ?,
         ?
         )
        `,
    [user_id, title, content]
  );
};

const getAllThread = async (id, title, content) => {
  const result = await AppDataSource.query(
    `
    SELECT id, title, content FROM boards
    `
  );
  return result;
};

module.exports = { createThreads, getAllThread };
