import { Test, TestingModule } from '@nestjs/testing';

import { PostController } from '@/post/controller/post.controller';
import { PostService } from '@/post/service/post.service';

import { INestApplication } from '@nestjs/common/interfaces';

import { AuthModule } from '@/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as request from 'supertest';

describe('Post Controller', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    global: true,
                    secret: process.env.REFRESH_SECRET,
                    signOptions: { expiresIn: '3d' },
                }),
                AuthModule,
            ],
            providers: [PostService],
            controllers: [PostController],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    describe('GET /admin/posts/1', () => {
        it('should return get posts', () => {
            return request(app.getHttpServer()).get('/admin/posts/1').expect(200);
        });
    });
});
