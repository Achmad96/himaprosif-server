import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma.service';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    async getPostById(postId: string) {
        return await this.prisma.post.findFirst({
            where: {
                id: postId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                created_at: true,
                updated_at: true,
            },
        });
    }

    async getPosts() {
        return await this.prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                created_at: true,
                updated_at: true,
            },
        });
    }

    async createPost(authorId: string, title: string, content: string) {
        return await this.prisma.post.create({
            data: {
                title,
                content,
                authorId,
                updated_at: new Date(),
            },
        });
    }

    async editPost(
        authorId: string,
        id: string,
        title: string,
        content: string,
    ) {
        return await this.prisma.post.update({
            where: {
                id,
                authorId,
            },
            data: {
                title,
                content,
                updated_at: new Date(),
            },
        });
    }

    async deletePost(authorId: string, id: string) {
        return this.prisma.post.delete({
            where: {
                id,
                authorId,
            },
        });
    }
}
