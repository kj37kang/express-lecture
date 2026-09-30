CREATE TABLE posts (
  id         INTEGER,
  username   VARCHAR(50),
  post_image TEXT,
  content    TEXT,
  like_count INTEGER
);

DROP TABLE posts;

CREATE TABLE posts (
  id         SERIAL      PRIMARY KEY,
  username   VARCHAR(50) NOT NULL,
  post_image TEXT        NOT NULL,
  content    TEXT,
  like_count INTEGER     NOT NULL DEFAULT 0
);

INSERT INTO posts (username, post_image, mood) VALUES ('minji', '/images/p.jpg', 'happy');

INSERT INTO posts (username, post_image) VALUES ('minji', NULL);

INSERT INTO posts (username, post_image, like_count) VALUES ('minji', '/images/p.jpg', '많아요');

INSERT INTO posts (username, post_image) VALUES (123, '/images/p.jpg');

DROP TABLE posts;

CREATE TABLE posts (
  id            SERIAL       PRIMARY KEY,
  username      VARCHAR(50)  NOT NULL,
  profile_image TEXT,
  post_image    TEXT         NOT NULL,
  post_alt      TEXT,
  content       TEXT,
  like_count    INTEGER      NOT NULL DEFAULT 0,
  comment_count INTEGER      NOT NULL DEFAULT 0,
  created_at    TIMESTAMP(3) NOT NULL DEFAULT now()
);

INSERT INTO posts (username, profile_image, post_image, post_alt, content, like_count, comment_count, created_at)
VALUES
  ('jaehoon', '/images/jaehoon.jpg', '/images/post-1.jpg', '노을 진 한강',     '퇴근길에 한강이 너무 예뻤어요', 128,  4, '2026-09-28 08:48:00'),
  ('minji',   '/images/minji.jpg',   '/images/post-2.jpg', '갓 구운 크루아상', '오늘의 베이킹 성공',            512, 23, '2026-09-28 08:15:00'),
  ('seungwoo','/images/seungwoo.jpg','/images/post-3.jpg', '농구 코트',        '주말 농구 한 판',                76,  8, '2026-09-28 06:00:00');

SELECT id, username, like_count
FROM posts
WHERE username = 'jaehoon'
;

SELECT id, username, like_count, comment_count
FROM posts
WHERE
  like_count > 100
  AND comment_count > 10
;

SELECT id, username, like_count
FROM posts
WHERE
  username = 'minji'
  OR username = 'seungwoo'
;

SELECT id, username, content
FROM posts
ORDER BY id
;

SELECT id, username, content
FROM posts
WHERE content IS NULL
;

UPDATE posts
SET
  content = '지하철 창밖이 예뻐서',
  post_alt = '퇴근길 지하철 창밖'
WHERE id = 5
;