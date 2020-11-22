import { Router, Request, Response} from 'express'; 
import Crowller from './crowller';
import AnalyzerClass from './analyzer';
import fs from 'fs';
import path from 'path';

const router = Router();
interface ReqWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  }
}
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
  res.redirect('/')
})

router.post('/login', (req: ReqWithBody, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.send('已登录，无需重复登录')
  } else {
    if (password === '123' && req.session) {
      if (req.session) {
        req.session.login = true
        res.send('登录成功')

      } else {
        res.send('登录失败')
      }
    }
  }
  
})

router.get('/getData', (req: ReqWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    const secret: string = 'x3b174jsx';
    const filePath = path.resolve(__dirname, '../data/course.json')
    const url: string = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = AnalyzerClass.getInstance();
    new Crowller(url, analyzer);
    res.send('爬取成功');
  } else {
    res.send('请登录')
  }
});

router.get('/showData', (req: ReqWithBody, res: Response) => {
  const position = path.resolve(__dirname, '../data/course.json')
  if (position) {
    const result = fs.readFileSync(position, 'utf-8')
    res.json(JSON.parse(result))
  } else {
    res.send('未爬取内容')
  }
});
export default router;

