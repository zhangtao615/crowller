import superagent from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs'
import path from 'path'
interface Course {
  title: string;
  count: number;
}
interface CourseResult {
  time: number;
  data: Course[]
};
interface Content {
  [propName: number]: Course[];
};
class Crowller {
  private courseInfo: Course[] = []
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  async getRawHtml () {
   const res = await superagent.get(this.url);
   return res.text
  }
  getCourseInfo (html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    courseItems.map((index, item) => {
      const descs = $(item).find('.course-desc')
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1], 10);
      this.courseInfo.push({
        title, count
      });
    });
    return {
      time: (new Date()).getTime(),
      data: this.courseInfo
    };
  };
  async initSpiderProcess () {
    const html = await this.getRawHtml();
    const courseInfo = this.getCourseInfo(html)
    this.generatrJsonContent(courseInfo)
  }
  generatrJsonContent (courseInfo: CourseResult) {
    const filePath = path.resolve(__dirname, '../data/data.json');
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      fileContent[courseInfo.time] = courseInfo.data;
      fs.writeFileSync(filePath, JSON.stringify(fileContent))
    }
  }
  constructor () {
    this.initSpiderProcess();
  }
}

const crowller  = new Crowller();