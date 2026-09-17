import express from 'express';

const profiles = [
  {
    username: 'jaehoon',
    name: '재훈',
    followerCount: 152,
  },
  {
    username: 'minji',
    name: '민지',
    followerCount: 5421,
  },
  {
    username: 'seungwoo',
    name: '승우',
    followerCount: 15555,
  },
]

const practice = express();

practice.get('/api/profiles', (req, res) => {
  res.json(profiles);
});

practice.get('/api/profiles/:username', (req, res) => {
  const username = req.params.username;
  const profile = profiles.find(one => one.username === username);
  res.json(profile);
});

practice.listen(4000, () => {
  console.log('실습 서버 실행 중입니다.');
});