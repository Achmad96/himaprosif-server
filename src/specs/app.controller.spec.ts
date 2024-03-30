import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';

describe('AppController', () => {
    let app: INestApplication;
    let appController: AppController;

    beforeEach(async () => {
        let moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
        appController = moduleFixture.get<AppController>(AppController);
    });

    describe('GET /', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    });

    describe('POST /', () => {
        it('should return "Hello [name]"', () => {
            return request(app.getHttpServer())
                .post('/')
                .send({ name: 'Mamad' })
                .expect(201)
                .expect('Hello Mamad');
        });
    });
});
