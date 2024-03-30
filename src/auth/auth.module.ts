import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from 'src/auth/auth.controller';

import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.ACCESS_SECRET,
            signOptions: { expiresIn: '3d' },
        }),
    ],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
})
export class AuthModule {}
