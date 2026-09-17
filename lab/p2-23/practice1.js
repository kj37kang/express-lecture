import express from 'express';

const comments = [
   {
    id: 1,
    postId: 1,
    username: 'butter',
    text: '버터'
  },
   {
    id: 2,
    postId: 2,
    username: 'coffee',
    text: '커피'
  },
   {
    id: 3,
    postId: 3,
    username: 'gallaxy',
    text: '갤럭시'
  },
]

const app = express();

app.use(express.json());

app.get('/api/comments', (req, res) => {
  res.json(comments);
});

app.post('/api/comments', (req, res) => {
  console.log(req.body);

  const newPost = {
    ...req.body,
    id: nextId,
    likeCount: 0,
    commentCount: 0,
    minutesAgo: 0,
  }

  nextId++;
  comments.push(newPost);

  res.status(201).json(newPost);

  // res.json({
  //   message: '일단 요청 받음',
  // });
});

practice.listen(4000, () => {
  console.log('실습 서버 실행 중입니다.');
});