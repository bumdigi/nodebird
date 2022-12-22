const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');

const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            done(null, false, { reason: '존재하지 않는 이메일 입니다.' });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          } else {
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
          }
        } catch (error) {
          // 서버에러
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
