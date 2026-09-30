SELECT * FROM books;
SELECT * FROM reviews;

-- 1. books 추가
INSERT INTO books (title, author, price, stock) VALUES ('오브젝트', '조영호', 36000, 3);

-- 2. JOIN
SELECT b.title, r.reviewer, r.score
FROM books b JOIN reviews r
ON b.id = r.book_id
ORDER BY b.id, r.id
;

-- 3. JOIN
SELECT b.title, r.reviewer, r.score
FROM books b LEFT OUTER JOIN reviews r
ON b.id = r.book_id
ORDER BY b.id, r.id
;

-- ### 직접 해보기 — 서점 책마다 리뷰 수와 평균 별점

-- 오늘 배운 것을 전부 모아서 서점 화면에 쓸 숫자를 뽑는 실습이에요. `bookstore`에 연결한 쿼리 창으로 옮겨서 해요.

-- **해볼 것**

-- 1. 책마다 제목과 함께 리뷰 수와 평균 별점을 구해서 책 번호 순으로 정렬하세요. 리뷰가 없는 책도 목록에 나와야 해요. 평균은 소수점 아래 한 자리까지요.
-- 2. 오브젝트의 리뷰 수와 평균 별점이 각각 어떻게 나왔는지 보고, 왜 그런지 한 문장으로 적으세요.
-- 3. 1번 결과에서 리뷰가 2개 이상 달린 책만 남기세요.

SELECT * FROM books;
SELECT * FROM reviews;

-- 1.
SELECT
  b.id, b.title
  COUNT(r.id), ROUND(AVG(r.score), 1)
FROM books b JOIN reviews r ON b.id = r.book_id
GROUP BY b.id, b.title
ORDER BY b.id
;

CREATE TABLE authors (
  id   SERIAL       PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);


INSERT INTO authors (name)
VALUES ('로버트 마틴'), ('마틴 파울러'), ('켄트 벡'), ('김창준'), ('조영호');


INSERT INTO books (title, author, price, stock) VALUES ('클린 아키텍처', '로버트 마틴', 32000, 4);


ALTER TABLE books ADD COLUMN author_id INTEGER;

UPDATE books SET author_id = 1 WHERE author = '로버트 마틴';
UPDATE books SET author_id = 2 WHERE author = '마틴 파울러';
UPDATE books SET author_id = 3 WHERE author = '켄트 벡';
UPDATE books SET author_id = 4 WHERE author = '김창준';
UPDATE books SET author_id = 5 WHERE author = '조영호';


ALTER TABLE books
  ADD CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id) REFERENCES authors (id);