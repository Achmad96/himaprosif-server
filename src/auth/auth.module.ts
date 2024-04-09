import { Module } from '@nestjs/common';

import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';

import { PrismaService } from '@/prisma.service';

@Module({
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService, PrismaService],
})
export class AuthModule {}
