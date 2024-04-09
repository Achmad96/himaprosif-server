import { Module } from '@nestjs/common';

import { AuthController } from '@/auth/controller/auth.controller';
import { AuthService } from '@/auth/service/auth.service';

import { PrismaService } from '@/prisma.service';

@Module({
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService, PrismaService],
})
export class AuthModule {}
