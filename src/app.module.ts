import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '@/auth/auth.module';
import { PostModule } from '@/post/post.module';

import { AppService } from '@/app.service';
import { AppController } from '@/app.controller';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.REFRESH_SECRET,
            signOptions: { expiresIn: '3d' },
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 60000, // 1 minutes
                limit: 10,
            },
        ]),
        AuthModule,
        PostModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
