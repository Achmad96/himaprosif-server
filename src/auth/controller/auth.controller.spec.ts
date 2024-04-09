import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '@/auth/controller/auth.controller';
import { AuthService } from '@/auth/service/auth.service';

import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { PrismaService } from '@/prisma.service';

describe('Auth Controller', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService],
            controllers: [AuthController],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    describe('GET /auth', () => {
        it("should be couldn't sign in", () => {
            return request(app.getHttpServer())
                .get('/auth')
                .send({
                    username: 'woilah',
                    password: 'anjaygimang',
                })
                .expect(401);
        });
    });
});
