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

module.exports = { createThreads };
