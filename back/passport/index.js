const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  // 쿠키와 묶어둘 ID값 저장
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
