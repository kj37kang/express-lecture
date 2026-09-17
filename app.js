import express from 'express';
import mongoose from 'mongoose';
import { posts } from './data/posts.js'

const MONGO_URL = '';

let nextId = 4;

const app = express();

// 모든 요청 초압에 작성해서 클라이언트가 보낸 데이터를 재조립
app.use(express.json());

// 몽고DB 연결
await mongoose.connect(MONGO_URL);
console.log('데이터베이스에 연결됐어요.');

app.get('/', (req, res) => {
  res.send('<h1>인스타그램 서버가 살아 있어요</h1>');
});

// 게시글 불러오기
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((one) => one.id === id);
  if(!post){
    res.status(404).json({
      message: '그런 게시물은 존재하지 않습니다.'
    });
    return;
  }
  res.json(post);
});

// 게시글 등록하기
app.post('/api/posts', (req, res) => {
  console.log(req.body);

  // 입력값 검증 (validation)
  const { username, postImage } = req.body;

  if (!username || !postImage) {
    res.status(400).json({ message: 'username과 postImage는 꼭 있어야 해요' });
    return;
  }

  // 실제 값 추가
  const newPost = {
    ...req.body,
    id: nextId,
    likeCount: 0,
    commentCount: 0,
    minutesAgo: 0,
  }

  nextId++;
  posts.push(newPost);

  res.status(201).json(newPost);
});

// 좋아요 수정 요청
app.patch('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = posts.find(p => p.id === id);

  if (!found) {
    res.status(404).json({ message: '그런 게시물은 없어요' });
    return;
  }

  found.likeCount = req.body.likeCount;

  res.json(found);
});

// 게시글 삭제하기
app.delete('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  
  if (index === -1) {
    res.status(404).json({ message: '그런 게시물은 없어요' });
    return;
  }
  
  const deleted = posts[index];
  posts.splice(index, 1);

  res.json(deleted);
});

// 404 처리를 기본 설정에서 커스텀 설정으로 변경
// 순서 중요! 위에 배치하면 정상 동작도 오류로 처리
app.use((req, res) => {
  res.status(404).json({
    message: '그런 게시물은 존재하지 않습니다.'
  });
});

app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 기다리고 있어요.');
});