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

const getAllThread = async (page = 1, limit = 50) => {
  const offset = (page - 1) * limit;

  const result = await AppDataSource.query(
    `
    SELECT id, title, content FROM boards
    LiMIT ${limit} OFFSET ${offset}
    `
  );
  return result;
};

module.exports = { createThreads, getAllThread };
