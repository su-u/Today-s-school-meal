const puppeteer = require('puppeteer');
import { schoolMeal } from './schoolMeal';
process.setMaxListeners(50);

const pageList: [string, string][] = [
  ['月曜日', 'https://www.cit-s.com/mobile/tsuda_d/1-mon.html'],
  ['火曜日', 'https://www.cit-s.com/mobile/tsuda_d/2-tue.html'],
  ['水曜日', 'https://www.cit-s.com/mobile/tsuda_d/3-wed.html'],
  ['木曜日', 'https://www.cit-s.com/mobile/tsuda_d/4-thu.html'],
  ['金曜日', 'https://www.cit-s.com/mobile/tsuda_d/5-fri.html'],
  ['土曜日', 'https://www.cit-s.com/mobile/tsuda_d/6-sat.html'],
];
const xpathList: number[] = [8, 11, 14, 15, 18, 21, 3];
// const xpathList: number[] = [3];

export const main = async () => {
  try {
    const browser = await puppeteer
      .launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      .catch((e: any) => {
        throw e;
      });
    const week = await Promise.all([
      ...pageList.map(async x => {
        const [date] = await Promise.all([
          xpathList.map(async y => {
            const page = await browser.newPage();
            await page.goto(x[1]);
            let text = '';
            try {
              await page.waitForXPath(`/html/body/text()[${y}]`, {
                timeout: 3000,
              });
              const elems = await page.$x(`/html/body/text()[${y}]`);
              const jsHandle = await elems[0].getProperty('textContent');
              text = await jsHandle.jsonValue();
            } catch (e) {
              console.error(e);
            }
            // await console.log(text);
            return text?.trim();
          }),
        ]);
        const dateMeal: schoolMeal = {
          date: await date[6],
          launchA: await date[0],
          launchB: await date[1],
          launchC: [await date[2], await date[3]],
          dailySalad: await date[4],
          gourmetCurry: await date[5],
          createDate: new Date().toString(),
        };
        // console.log({ dateMeal });
        return dateMeal;
      }),
    ]);
    await browser.close();
    console.log(week);
  } catch (e) {
    throw e.message;
  } finally {
  }
};
