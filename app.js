require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const redis = require('redis');
const { globalErrorHandler } = require('./src/utils/errorHandle');
const userRouter = require('./src/users/userRoute');
const { AppDataSource } = require('./src/models/data_source');
const threadRouter = require('./src/threads/threadsRoute');

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/api', userRouter);
app.use('/api/threads', threadRouter);
app.use(globalErrorHandler);

app.get('/ping', (req, res, next) => {
  res.status(200).json({ message: 'pong' });
});

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source hs been initialized!');
    })
    .catch((error) => {
      console.error('Error during Data Source initialization', error);
    });
  console.log(`Listening to request on port: ${PORT}`);
});

const redisClient = redis.createClient({
  url: `redis://:@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true,
});
redisClient.on('connect', () => {
  console.info('Redis connected');
});
redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});
redisClient.connect().then();
const redisCli = redisClient.v4;
