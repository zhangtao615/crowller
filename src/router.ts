import { Router, Request, Response, NextFunction} from 'express'; 
import Crowller from './crowller';
import AnalyzerClass from './analyzer';
import { getResData } from './utils';
import fs from 'fs';
import path from 'path';

const router = Router();
interface ReqWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  }
}
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    next();
  } else {
    res.json(getResData(null, '未登录'))
  }
};

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.send(`
      <html>
        <body>
        <a href="/getData">爬取内容</a>
        <a href='./showData'>展示内容</a>
          <a href="logout">退出</a>
        </body>
      </html>
    `)
  } else {
    res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" />
          <button>登录</button>
        </form>
      </body>
    </html>
  `);
  }
  
})

router.get('/logout', (req: ReqWithBody, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.json(getResData(true))
})

router.post('/login', (req: ReqWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResData(false, '已登录，无需重复登录'))
  } else {
    if (password === '123' && req.session) {
      if (req.session) {
        req.session.login = true
        res.json(getResData(true))
      } else {
        res.send('登录失败')
      }
    }
  }
  
})

router.get('/getData', checkLogin, (req: ReqWithBody, res: Response) => {
    const secret: string = 'x3b174jsx';
    const filePath = path.resolve(__dirname, '../data/course.json')
    const url: string = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = AnalyzerClass.getInstance();
    new Crowller(url, analyzer);
    res.json(getResData(true))
});

router.get('/showData', (req: ReqWithBody, res: Response) => {
  const position = path.resolve(__dirname, '../data/course.json')
  if (position) {
    const result = fs.readFileSync(position, 'utf-8')
    res.json(JSON.parse(result))
  } else {
    res.json(getResData(false, '还未爬取数据'))
  }
});
export default router;

