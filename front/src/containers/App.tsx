import React from 'react';
import request from 'request';
import { JSDOM } from 'jsdom';

request('http://www.uec.ac.jp/', (e, response, body) => {
  if (e) {
    console.error(e);
  }

  try {
    const dom = new JSDOM(body);
    const latestDate = dom.window.document
      .querySelector('.newsList')
      .children[0].firstChild.textContent.trim();
    console.log(`最新の新着情報の日付は${latestDate}です。`);
  } catch (e) {
    console.error(e);
  }
});

const App = () => {
  return (
    <>
      <div data-test="div1">テストアプリテキスト</div>
      <div>divテキスト</div>
      <h2>見出しテキスト</h2>
    </>
  );
};

export default App;
