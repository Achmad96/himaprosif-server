import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from '@/services/app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  async sayHello(@Req() request: Request) {
    const { name }: any = request.body;
    let username: string = name || 'None';
    return this.appService.sayHello(username);
  }
}
