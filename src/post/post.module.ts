import { Module } from '@nestjs/common';
import { PostController } from './post.controller';

import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    providers: [PostService],
    controllers: [PostController],
})
export class PostModule {}
