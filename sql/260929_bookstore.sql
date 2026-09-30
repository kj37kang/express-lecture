CREATE TABLE books (
  id     SERIAL       PRIMARY KEY,
  title  VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  price  INTEGER      NOT NULL,
  stock  INTEGER      NOT NULL DEFAULT 0
);

INSERT INTO books (title, author, price, stock) VALUES ('어린 왕자', '생택쥐페리', 12000, 10);

DROP TABLE books;

INSERT INTO books (title, author, price, stock) VALUES
  ('클린 코드',        '로버트 마틴', 33000,  5),
  ('리팩터링',         '마틴 파울러', 55000,  2),
  ('클린 아키텍처',    '로버트 마틴', 32000,  0),
  ('테스트 주도 개발', '켄트 벡',     25000,  8),
  ('함께 자라기',      '김창준',      12000, 12),
  ('실용주의 프로그래머', '데이비드 토머스', 28000, 0);

SELECT title, author, price, stock
FROM books
WHERE price >= 30000
;

SELECT title, author, price, stock
FROM books
WHERE stock = 0
;

SELECT title, author, price, stock
FROM books
WHERE author IN ('로버트 마틴', '켄트 벡')
;

SELECT title, author, price, stock
FROM books
WHERE price BETWEEN 20000 AND 40000
;

SELECT title, author, price, stock
FROM books
WHERE title LIKE '%클린%'
;

SELECT title, author, price, stock
FROM books
WHERE stock = 0
;

UPDATE books
SET price = price + 3000
WHERE id = 1
;

DELETE FROM books WHERE stock = 0;

SELECT id, title, author, price, stock
FROM books
ORDER BY price DESC
;

CREATE TABLE reviews (
  id         SERIAL       PRIMARY KEY,
  book_title VARCHAR(200) NOT NULL,
  reviewer   VARCHAR(100) NOT NULL,
  score      INTEGER      NOT NULL,
  comment    TEXT
);

INSERT INTO reviews (book_title, reviewer, score, comment) VALUES
  ('클린 코드',        'jaehoon',  5, '두고두고 봐요'),
  ('클린 코드',        'minji',    2, '별로예요'),
  ('리팩터링',         'seungwoo', 4, '예제가 친절해요'),
  ('리팩터링',         'dahye',    3, NULL),
  ('테스트 주도 개발', 'nayeon',   5, '실습이 좋아요'),
  ('함께 자라기',      'jaehoon',  4, NULL);

SELECT * FROM books;
SELECT * FROM reviews;

ALTER TABLE reviews ADD COLUMN book_id INTEGER;

UPDATE reviews SET book_id = 1 WHERE book_title = '클린 코드';
UPDATE reviews SET book_id = 2 WHERE book_title = '리팩터링';
UPDATE reviews SET book_id = 4 WHERE book_title = '테스트 주도 개발';
UPDATE reviews SET book_id = 5 WHERE book_title = '함께 자라기';

ALTER TABLE reviews
  ADD CONSTRAINT reviews_book_id_fkey FOREIGN KEY (book_id) REFERENCES books (id);