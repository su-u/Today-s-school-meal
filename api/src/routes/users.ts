import { NextFunction, Request, Response } from 'express';
import { main } from '../getPage';

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('I am a log enatry!');
  main().catch(e => console.log(e));
  res.json({
    test: 'aaa',
    wofowfjwofjoajwfjawfjfow: [{ aaa: true }, { result: false }],
    time: 'nau',
  });
});

export { router };
