import { Test, TestingModule } from '@nestjs/testing';

import { PostService } from '../post/post.service';
import { PrismaService } from '../utils/prisma.service';

const posts = [
    {
        id: 'P1',
        title: 'title1',
        content: 'content1',
        authorId: 'A1',
    },
    {
        id: 'P2',
        title: 'title2',
        content: 'content2',
        authorId: 'A2',
    },
    {
        id: 'P3',
        title: 'title3',
        content: 'content3',
        authorId: 'A3',
    },
];
const firstPost = posts[0];
const db = {
    post: {
        findMany: jest.fn().mockResolvedValue(posts),
        findUnique: jest.fn().mockResolvedValue(firstPost),
        findFirst: jest.fn().mockResolvedValue(firstPost),
        create: jest.fn().mockReturnValue(firstPost),
        save: jest.fn(),
        update: jest.fn().mockResolvedValue(firstPost),
        delete: jest.fn().mockResolvedValue(firstPost),
    },
};

describe('Post Service', () => {
    let service: PostService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostService,
                {
                    provide: PrismaService,
                    useValue: db,
                },
            ],
        }).compile();

        service = module.get<PostService>(PostService);
    });

    describe('get posts', () => {
        it('should return posts', async () => {
            const result = await service.getPosts();
            expect(result).toEqual(posts);
        });
    });

    describe('get post by id', () => {
        it('should return post', async () => {
            const result = await service.getPostById('P1');
            expect(result).toEqual(firstPost);
        });
    });
});
