import { prisma } from '../db.js';

// 게시물 목록 전체 조회
export function getPosts({username, limit}) {
  return prisma.post.findMany({
    where: { username },
    orderBy: { createdAt: 'desc' },
    take: limit,
  }); // SELECT * FROM posts;
}

// 단일 게시물 조회
export function getPost(id) {
  return prisma.post.findUnique({ where: { id } });
}

// 게시물 생성
export function createPost(data) {
  return prisma.post.create({ data });
}

// 게시물 수정
export async function updatePost(id, data) {
  try {
    return await prisma.post.update({ where: { id }, data });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

// 게시물 삭제
export async function removePost(id) {
  try {
    return await prisma.post.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}