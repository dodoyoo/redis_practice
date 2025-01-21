const { catchAsync } = require('../utils/errorHandle');
const { createThreads } = require('./threadsRepository');
const { getAllThread } = require('./threadsRepository');

const createThread = catchAsync(async (req, res) => {
  const { user_id, title, content } = req.body;

  if (!user_id || !title || !content) {
    const err = new Error('Missing required fields');
    err.statusCode = 400;
    throw err;
  }

  await createThreads(user_id, title, content);

  res.status(201).json({ message: '게시글 작성 성공' });
});

const getThread = catchAsync(async (req, res) => {
  const data = await getAllThread();

  console.log('@@@@@@@@@@@@@@:', data);
  res.status(200).json({ data });
});
module.exports = { createThread, getThread };
