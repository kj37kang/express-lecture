import express from 'express';

const books = [
   {
    id: 1,
    title: '한국사 이상현상 연구원',
    author: '김저자',
    stock : 152
  },
   {
    id: 1,
    title: '싯다르타 - 세계문학전집 58',
    author: '엮은이',
    stock : 541
  },
   {
    id: 1,
    title: '눈 내리는 삼일포',
    author: '홍길동',
    stock : 75
  },
]

let nextId = 4;

const app = express();

app.use(express.json());

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;

  if ( !title || !author ) {
    res.status(400).json({
      message: 'title과 author는 꼭 있어야 해요',
    });
  }

  const newBook = {
    ...req.body,
    id: nextId,
    stock: 0,
  }

  nextId++;
  books.push(newBook);

  res.status(201).json(newBook);
});

app.patch('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = books.find(b => b.id === id);

  if ( !found ) {
    res.status(404).json({
      message: '그런 책은 없어요',
    });
    return;
  }

  // for(const key in req.body){
  //   found.key = req.body.key;
  // }
  books[index] = { ...books[index], ...req.body, id };

  res.json(found);
});

app.delete('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if ( index === -1 ) {
    res.status(404).json({
      message: '그런 책은 없어요',
    });
    return;
  }

  const deleted = books[index];
  books.splice(index, 1);

  res.json(deleted);
});

app.listen(4000, () => {
  console.log('실습 서버 실행 중입니다.');
});