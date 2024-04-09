import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
    @Inject()
    private readonly appService: AppService;

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post()
    async sayHello(@Req() request: Request) {
        const { name }: any = request.body;
        return this.appService.sayHello(name || 'None');
    }
}
