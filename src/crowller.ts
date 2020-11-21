import superagent from 'superagent';
import fs from 'fs'
import path from 'path'
import AnalyzerClass from './analyzer'

interface Analyzer {
  analyzer: (html: string, filePath: string) => string;
}


// 创建爬虫类
class Crowller {
  private filePath = path.resolve(__dirname, '../data/data.json')
  
  // 获取网页html
  async getRawHtml () {
   const res = await superagent.get(url);
   return res.text
  }

  // 将爬取的数据写进文件
  writeFile (content: string) {
    fs.writeFileSync(this.filePath, JSON.stringify(content))
  }

  async initSpiderProcess () {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyzer(html, this.filePath)
  }


  constructor (url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
}

const secret = `x3b174jsx`
const url =  `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyzer = new AnalyzerClass()
new Crowller(url, analyzer);