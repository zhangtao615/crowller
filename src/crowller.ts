import superagent from 'superagent'
import cheerio from 'cheerio'
class Crowller {
  private url = `http://es.xiecheng.live/`
  async getRawHtml () {
    const result = await superagent.get(this.url);
    this.getInfo(result.text);
  }
  getInfo (html: string) {
    const $ = cheerio.load(html)
  }
  constructor () {
    this.getRawHtml()
  }
}

const crowller  = new Crowller()