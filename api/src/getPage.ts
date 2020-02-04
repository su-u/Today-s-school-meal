const puppeteer = require('puppeteer');

const xpathList: number[] = [8, 11, 14];
const pageList: string[] = [
  'https://www.cit-s.com/mobile/tsuda_d/1-mon.html',
  'https://www.cit-s.com/mobile/tsuda_d/2-tue.html',
];

export const main = async () => {
  let funcList: Function[] = [];
  pageList.map(async x => {
    xpathList.map(async y => {
      funcList.push(getContents(x, y));
    });
  });
  try {
    await Promise.all(funcList).catch(e => console.log(e));
  } catch (e) {
    throw e.message;
  } finally {
  }
};

const getContents = (url: string, path: number) => {
  const f = async () => {
    const xpath = `/html/body/text()[${path}]`;
    const browser = await puppeteer
      .launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      .catch(e => {
        throw e;
      });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForXPath(xpath);
    const elems = await page.$x(xpath);
    const jsHandle = await elems[0].getProperty('textContent');
    const text = await jsHandle.jsonValue();
    browser.close();
    return text;
  };
  return f;
};
