import { Test, TestingModule } from '@nestjs/testing';

import { PostController } from '../post/post.controller';
import { PostService } from '../post/post.service';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';

describe('PostController', () => {
    let app: INestApplication;
    let postController: PostController;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [PostController],
            providers: [PostService],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
        postController = moduleFixture.get<PostController>(PostController);
    });

    describe('GET /admin/posts', () => {
        it('should return objects', () => {
            expect(postController.getPosts()).toBeDefined();
        });
    });

    describe.skip('GET /admin/posts/:id', () => {
        it('should return only one object', () => {
            expect(
                postController.getPostById('' /* the ID here */),
            ).toBeDefined();
        });
    });

    describe.skip('POST /admin/posts', () => {
        it('should return "Hello [name]"', () => {
            return request(app.getHttpServer())
                .post('/admin/posts')
                .send({
                    title: 'Lorem ipsum',
                    content: 'Hello world',
                })
                .expect(201);
        });
    });

    describe.skip('DELETE /admin/posts', () => {
        it('should delete ', () => {
            const id = '';
            return request(app.getHttpServer())
                .delete(`/admin/posts/${id}`)
                .expect(200);
        });
    });
});
