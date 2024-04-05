import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

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
