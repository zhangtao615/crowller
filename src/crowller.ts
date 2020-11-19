import superagent from 'superagent';
import cheerio from 'cheerio';
interface Course {
  title: string;
  count: number;
}
class Crowller {
  private courseInfo: Course[] = []
  private secret = 'x3b174jsx';
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  async getRawHtml () {
   const res = await superagent.get(this.url);
   this.getCourseInfo(res.text)
  }
  getCourseInfo (html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    console.log(courseItems.length)
    courseItems.map((index, item) => {
      const descs = $(item).find('.course-desc')
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1], 10);
      this.courseInfo.push({
        title, count
      });
    });
    const res = {
      time: (new Date()).getTime(),
      data: this.courseInfo
    };
    console.log(res)
  };
  constructor () {
    this.getRawHtml();
  }
}

const crowller  = new Crowller();