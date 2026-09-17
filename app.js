// ~/instagram-api/app.js
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>인스타그램 서버가 살아 있어요</h1>');
});

app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 기다리고 있어요.');
});