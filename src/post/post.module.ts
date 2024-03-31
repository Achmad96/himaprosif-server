import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
    imports: [AuthModule],
    providers: [PostService],
    controllers: [PostController],
})
export class PostModule {}
