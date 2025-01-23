const { catchAsync } = require('../utils/errorHandle');
const { createThreads } = require('./threadsRepository');
const { getAllThread } = require('./threadsRepository');
const { redisClient } = require('../utils/redis');

const getThread = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  try {
    const cacheKey = `threads:page${page}:limit${limit}`;

    if (!redisClient.isOpen) {
      const data = await getAllThread(page, limit);
      return res.status(200).json({ data });
    }

    let cacheData = await redisClient.get(cacheKey);

    if (cacheData) {
      cacheData = JSON.parse(cacheData);
      return res.status(200).json({
        data: cacheData,
        fromCache: true,
      });
    }
    const data = await getAllThread(page, limit);
    console.log('Saving redis');

    await redisClient.set(cacheKey, JSON.stringify(data), {
      EX: 60,
    });
    console.log('Saved To Redis');

    return res.status(200).json({
      data,
      fromCache: false,
    });
  } catch (error) {
    console.error('Redis error', error);

    const data = await getAllThread(page, limit);
    return res.status(200).json({ data });
  }
});

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
module.exports = { createThread, getThread };
