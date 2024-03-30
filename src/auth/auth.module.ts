import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from '../auth/auth.controller';

import { PrismaService } from '../prisma.service';

@Module({
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService, PrismaService],
})
export class AuthModule {}
