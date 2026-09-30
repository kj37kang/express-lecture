SELECT * FROM posts ORDER BY id;
SELECT * FROM comments;

SELECT
  p.username AS "게시글 작성자",
  p.post_alt AS "원본 게시물",
  c.username AS "댓글 작성자",
  c.content AS "댓글 내용"
FROM posts p
INNER JOIN comments c
ON p.id = c.post_id
;

SELECT
  p.username AS "게시글 작성자",
  p.post_alt AS "원본 게시물",
  c.username AS "댓글 작성자",
  c.content AS "댓글 내용"
FROM posts p
LEFT OUTER JOIN comments c
ON p.id = c.post_id
WHERE c.content IS NULL
;

SELECT *
FROM posts p LEFT JOIN comments c ON c.post_id = p.id;

SELECT count(*) AS 별표, count(c.id) AS 칸이름
FROM posts p LEFT JOIN comments c ON c.post_id = p.id;

-- 각 게시물 별 댓글 수 구하기
SELECT p.id, p.post_alt, COUNT(c.id) AS "댓글 수"
FROM posts p LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id, p.post_alt
ORDER BY p.id
;

SELECT post_id, count(*) AS 개수
FROM comments
WHERE like_count > 0
GROUP BY post_id
HAVING count(*) >= 3
ORDER BY post_id;

SELECT count(*) AS 개수, sum(like_count) AS 합,
  avg(like_count) AS 평균, max(like_count) AS 최대, min(like_count) AS 최소
FROM comments;

SELECT post_id, count(*) AS 개수, sum(like_count) AS 합,
  round(avg(like_count), 1) AS 평균, max(like_count) AS 최대
FROM comments
GROUP BY post_id
ORDER BY post_id;