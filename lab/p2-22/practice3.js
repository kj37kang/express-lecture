import express from 'express';

const books = [
  {
    id: 1,
    title: '한국사 이상현상 연구원',
  },
  {
    id: 2,
    title: '싯다르타 - 세계문학전집 58',
  },
  {
    id: 3,
    title: '눈 내리는 삼일포',
  },
]

const practice = express();

practice.get('/api/books', (req, res) => {
  res.json(books);
});

practice.get('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(one => one.id === id);
  if (!book) {
    res.status(404).json({
      massage: '그런 책은 없어요',
    });
    return;
  }
  res.json(book);
});

practice.use((req, res) => {
  res.status(404).json({
    massage: '그런 주소는 없어요',
  })
})

practice.listen(4000, () => {
  console.log('실습 서버 실행 중입니다.');
});