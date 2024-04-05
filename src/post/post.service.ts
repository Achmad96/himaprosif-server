import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/utils/prisma.service';

const PostSelect = {
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
};

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    async getPostById(postId: string) {
        return await this.prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: PostSelect,
        });
    }

    async getPosts(page: number = 1) {
        const skip = (page - 1) * 5;
        return await this.prisma.post.findMany({
            select: PostSelect,
            skip,
            take: 5,
        });
    }
    async getPostsSize(): Promise<number> {
        const totalPosts = await this.prisma.post.count();
        return Math.ceil(totalPosts / 5);
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
