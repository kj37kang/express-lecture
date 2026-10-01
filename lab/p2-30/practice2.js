import express from 'express';
import { bookstore } from './bookstore.js';

const app = express();

app.get('/api/books', async (req, res) => {
  const books = await bookstore.book.findMany({
    where: { author: req.query.author },
    orderBy: { id: 'asc' },
  });

  res.json(books);
});

app.listen(4000, () => {
  console.log('서버가 4000번 포트에서 실행 중입니다.');
});