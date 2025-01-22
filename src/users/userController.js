const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils/errorHandle');
const { createUser, getUserByEmail } = require('./userRepository');
const { JsonWebTokenError } = require('jsonwebtoken');

const signUp = catchAsync(async (req, res) => {
  const { email, password, nickname } = req.body;

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(email)) {
      const err = new Error('invalid email format');
      err.statusCode = 400;
      throw err;
    }
  };

  validateEmail(email);

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  // 유저 생성
  await createUser(email, hashedPassword, nickname);

  // 응답
  res.status(201).json({ message: '회원가입 성공' });
});

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    const err = new Error('유저를 찾을 수 없습니다.');
    err.statusCode = 404;
    throw err;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  console.log('password: ', password, '@@@@@@@@@@@@@@@@@@ :', user.password);
  if (!isValidPassword) {
    const err = new Error('비밀번호가 다릅니다.');
    err.statusCode = 404;
    throw err;
  }

  const token = jwt.sign(
    {
      id: user.id, // user 객체에서 id 가져옴
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '7d',
    }
  );

  res.status(200).json({
    message: '로그인 성공',
    token,
  });
});

module.exports = { signUp, signIn };
