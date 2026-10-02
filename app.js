import express from 'express';
import cors from 'cors';
import postRouter from './routes/post.js';
import { HttpError } from './errors.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());

// 모든 요청 초입에 작동해서 클라이언트가 보낸 json을 재조립
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>인스타그램 서버가 살아 있어요</h1>');
});

app.use('/api/posts', postRouter);

// 404 처리를 기본 설정에서 커스텀 설정으로 변경
// 순서 중요! 위에 배치하면 정상 동작도 오류로 처리
app.use((req, res) => {
  res.status(404).json({
    message: '그런 게시물은 존재하지 않습니다.'
  });
});

// 전역 예외처리 구간
app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    const body = { message: err.message };
    if (err.details) body.details = err.details;
    res.status(err.status).json(body);
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