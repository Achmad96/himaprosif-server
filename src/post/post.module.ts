import { Module } from '@nestjs/common';
import { PostController } from './post.controller';

import { PostService } from './post.service';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';

@Module({
    providers: [PostService, PrismaService, AuthService],
    controllers: [PostController],
})
export class PostModule {}
