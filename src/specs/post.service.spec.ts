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
        findUnique: jest
            .fn()
            .mockImplementation((postSelect) =>
                posts.find((post) => post.id === postSelect.where.id),
            ),
        findFirst: jest.fn().mockResolvedValue(firstPost),
        create: jest
            .fn()
            .mockImplementation(
                (postSelect) => posts.push(postSelect.data) && postSelect.data,
            ),
        update: jest.fn().mockImplementation((postSelect) => {
            const selectedPost = posts.find(
                (post) =>
                    post.id === postSelect.where.id &&
                    post.authorId === postSelect.where.authorId,
            );
            selectedPost.title = postSelect.data.title;
            selectedPost.content = postSelect.data.content;
            const { title, content, authorId, id } = selectedPost;

            return {
                title,
                content,
                authorId,
                id,
            };
        }),
        delete: jest.fn().mockImplementation((postSelect) => {
            const selectedPost = posts.findIndex(
                (post) =>
                    post.id === postSelect.where.id &&
                    post.authorId === postSelect.where.authorId,
            );
            // delete posts[selectedPost];
            return selectedPost;
        }),
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
            const result = await service.getPostById('P3');
            expect(result).toEqual(posts[2]);
        });
    });

    describe('create a new post', () => {
        it('should create a new post', async () => {
            const result = await service.createPost('A4', 'title4', 'content4');
            expect(result).toEqual({
                authorId: 'A4',
                title: 'title4',
                content: 'content4',
                updated_at: new Date(),
            });
        });
    });

    describe('edited post', () => {
        it('should edited a post', async () => {
            const result = await service.editPost(
                'A1',
                'P1',
                'title3',
                'content1',
            );
            expect(result).toEqual({
                authorId: 'A1',
                id: 'P1',
                title: 'title3',
                content: 'content1',
            });
        });
    });

    describe('deleted  post', () => {
        it('should create a new post', async () => {
            const result = await service.deletePost('A1', 'P1');
            expect(result).toBe(0);
        });
    });
});
