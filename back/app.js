const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db connection success');
  })
  .catch(console.error);

passportConfig();
app.use(morgan('dev'));
// Access-Control-Allow-Origin 을 header에 자동 적용하여 CORS 회피하는 middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/', express.static(path.join(__dirname, 'uploads')));
// front에서 받은 데이터를 req.body에 넣어주는 역할
// 미들웨어의 순서도 중요함
// json 형태의 데이터를 req.body에 넣어줌
app.use(express.json());
// form submit 형태의 데이터를 req.body에 넣어줌
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({ saveUninitialized: false, resave: false, secret: process.env.COOKIE_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

// 아래는 에러처리 미들웨어이고 기본적으로 내장되어있기 때문에 추가하지 않아도 된다.
// 따로 처리하고자 할 때만 아래와 같이 정의함.
// app.use((err, req, res, next) => {});

app.listen(3065, () => {
  console.log('server listening');
});
