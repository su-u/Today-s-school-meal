import React from 'react';
// import { getUri } from '@/utilities/ApiUri';

const App = () => {
  return (
    <>
      <div data-test="div1">テストアプリテキスト</div>
      <div>divテキスト</div>
      <h2>見出しテキスト</h2>
      {getUri()}
      <br />
      {process.env.NODE_ENV}
    </>
  );
};

export default App;
