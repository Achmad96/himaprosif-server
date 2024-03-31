import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.ACCESS_SECRET,
            signOptions: { expiresIn: '3d' },
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 60000, // millisecond
                limit: 10,
            },
        ]),
        AuthModule,
        PostModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
