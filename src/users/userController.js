const bcrypt = require('bcrypt');
const { catchAsync } = require('../utils/errorHandle');
const { createUser, getUserByEmail } = require('./userRepository');

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

  await getUserByEmail(email, password);

  res.status(201).json({ message: '로그인 성공' });
});

module.exports = { signUp, signIn };
