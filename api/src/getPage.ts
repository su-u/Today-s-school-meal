const { launch } = require('puppeteer');

const pageList: string[] = [
  'https://www.cit-s.com/mobile/tsuda_d/1-mon.html',
  'https://www.cit-s.com/mobile/tsuda_d/2-tue.html',
];
const xpathList: number[] = [8, 11, 14];

export const main = async () => {
  const funcList: any = [];
  pageList.map(async x => {
    xpathList.map(async y => {
      funcList.push(getContents(x, y));
    });
  });
  funcList[0]();
  try {
    await Promise.all(funcList)
      .then(results => {
        console.log(results);
      })
      .catch(e => console.log(e));
  } catch (e) {
    throw e.message;
  } finally {
    console.log('aaa');
  }
};

const getContents = (url: string, path: number) => {
  return async () => {
    console.log('ex');
    const xpath = `/html/body/text()[${path}]`;
    const browser = await launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }).catch((e: any) => {
      throw e;
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForXPath(xpath);
    const elems = await page.$x(xpath);
    const jsHandle = await elems[0].getProperty('textContent');
    const text = await jsHandle.jsonValue();
    browser.close();
    console.log(text);
    return text;
  };
};
