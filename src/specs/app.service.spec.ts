import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

describe('App Service', () => {
    let appService: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();
        appService = module.get<AppService>(AppService);
    });

    describe('GET /', () => {
        it('should return "Hello World!"', () => {
            jest.spyOn(appService, 'getHello').mockImplementation(
                () => 'Hello World!',
            );
        });
    });

    describe('POST /', () => {
        it('should return "Hello [name]"', () => {
            jest.spyOn(appService, 'sayHello').mockImplementation(
                (name: string) => `Hello ${name}`,
            );
        });
    });
});
