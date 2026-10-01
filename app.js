import express from 'express';
import cors from 'cors';
import { prisma } from './db.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());

// 모든 요청 초입에 작동해서 클라이언트가 보낸 json을 재조립
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>인스타그램 서버가 살아 있어요</h1>');
});

// 전체 게시물 목록 불러오기
app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { username: req.query.username },
    orderBy: { createdAt: 'desc' },
    take: Number(req.query.limit) || undefined
  }); // SELECT * FROM posts;
  res.json(posts);
});

// 단일 게시물 불러오기
app.get('/api/posts/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(404).json({ message: '그런 게시물은 없어요' });
    return;
  }

  const post = await prisma.post.findUnique({ where: { id } });
  // key와 value가 같으면 하나만 적어도 됨

  if(!post){
    res.status(404).json({
      message: '그런 게시물은 존재하지 않습니다.'
    });
    return;
  }
  res.json(post);
});

// 게시물 등록하기
app.post('/api/posts', async (req, res) => {
  // 입력값 검증 (validation)
  const { username, profileImage, postImage, postAlt, content } = req.body;

  if (!username || !postImage) {
    res.status(400).json({ message: 'username과 postImage는 꼭 있어야 해요' });
    return;
  }

  // 실제 값 추가
  const newPost = await prisma.post.create({
    data: { username, profileImage, postImage, postAlt, content },
  });

  res.status(201).json(newPost);
});

// 좋아요 수정하기
app.patch('/api/posts/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(404).json({ message: '그런 게시물은 없어요' });
    return;
  }

  const { username, profileImage, postImage, postAlt, content, likeCount } = req.body;

  const post = await prisma.post.update({
    where: { id },
    data: { username, profileImage, postImage, postAlt, content, likeCount },
  });

  res.json(post);
});

// 게시물 삭제하기
app.delete('/api/posts/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(404).json({ message: '그런 게시물은 없어요' });
    return;
  }

  const deleted = await prisma.post.delete({
    where: { id }
  });

  res.json(deleted);
});

// 404 처리를 기본 설정에서 커스텀 설정으로 변경
// 순서 중요! 위에 배치하면 정상 동작도 오류로 처리
app.use((req, res) => {
  res.status(404).json({
    message: '그런 게시물은 존재하지 않습니다.'
  });
});

app.use((err, req, res, next) => {
  if (err.code === 'P2025') {
    res.status(404).json({ message: '그런 게시물은 없어요' });
    return;
  }

  if (err.status) {
    res.status(err.status).json({ message: '보낸 내용을 읽을 수 없어요' });
    return;
  }

  console.error(err);
  res.status(500).json({ message: '서버에서 문제가 생겼어요' });
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 기다리고 있어요.`);
});