import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './router';

const app = express();
// body-parser中间件处理提交表单
app.use(bodyParser.urlencoded({ extended: false}));
// cookie-session 中间件处理登录
app.use(cookieSession({
  name: 'session',
  keys: ['teacher'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(router);

app.listen(7001, () => {
  console.log('express5')
})