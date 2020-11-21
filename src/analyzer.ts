import cheerio from 'cheerio';
import fs from 'fs';

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

export default class Analyzer {
 private courseInfo: Course[] = []
   // 获取课程信息
  private getCourseInfo (html: string) {
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

  // 处理获取到的信息
  generatrJsonContent (courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
     
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }


  public analyzer (html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generatrJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }
}