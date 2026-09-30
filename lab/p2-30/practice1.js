import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/index.js';

const adapter = new PrismaPg({ connectionString: process.env.BOOKSTORE_URL });
export const prisma = new PrismaClient({ adapter });

const books = await prisma.book.findMany({ orderBy: { id: 'asc' } });
console.log(books)

await prisma.$disconnect();