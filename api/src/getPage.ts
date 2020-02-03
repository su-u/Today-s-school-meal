const puppeteer = require('puppeteer');

const xpathList: number[] = [8, 11, 14];
const pageList: string[] = [
  'https://www.cit-s.com/mobile/tsuda_d/1-mon.html',
  'https://www.cit-s.com/mobile/tsuda_d/2-tue.html',
];

export const main = async () => {
  try {
    pageList.map(async x => {
      xpathList.map(async y => {
        const browser = await puppeteer
          .launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          })
          .catch(e => {
            throw e;
          });
        const page = await browser.newPage();
        await page.goto(x);
        await page.waitForXPath(`/html/body/text()[${y}]`);
        const elems = await page.$x(`/html/body/text()[${y}]`);
        const jsHandle = await elems[0].getProperty('textContent');
        const text = await jsHandle.jsonValue();
        await console.log(text);
        browser.close();
      });
    });
  } catch (e) {
    throw e.message;
  } finally {
  }
};
