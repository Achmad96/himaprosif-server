import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../utils/prisma.service';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}
    // prettier-ignore
    async signIn(usernameInput: string, passwordInput: string): Promise<{access_token: string; refresh_token: string; statusCode: 200}> {
        const user = await this.prismaService.admin.findFirst({
            where: { username: usernameInput },
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        const match = await bcrypt.compare(passwordInput, user.password);
        if (!match) {
            throw new UnauthorizedException();
        }
        const { id, username, name } = user;
        
        return {
            refresh_token: jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 3600 * 60 * 30, // 30 days
                    data: { id, username, name },
                },
                process.env.REFRESH_SECRET,
            ),
            access_token: jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 3600 * 60,
                    data: { id, username, name },
                },
                process.env.ACCESS_SECRET,
            ),
            statusCode: 200,
        };
    }

    verifyRefreshToken(refresh_token: string) {
        return jwt.verify(
            refresh_token,
            process.env.REFRESH_SECRET,
            (err, res) => {
                if (err) {
                    throw new UnauthorizedException();
                }
                const { data } = res['data'];
                const { id, username, name } = data;
                // prettier-ignore
                return {
                    access_token: jwt.sign(
                        {
                            exp: Math.floor(Date.now() / 1000) + 3600 * 60,
                            data: { id, username, name },
                        },
                        process.env.ACCESS_SECRET,
                    ),
                    statusCode: 200,
                };
            },
        );
    }

    extractTokenFromHeader(headers: Headers): string | undefined {
        const [type, token] = headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    getAuthorId(token: string): string {
        const payload = jwt.verify(token, process.env.ACCESS_SECRET);
        return payload ? payload['data'].id : undefined;
    }
}
