import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { RefreshTokenDto, SignInDto } from '@/auth/auth.dto';

@Controller('auth')
export class AuthController {
    @Inject()
    private readonly service: AuthService;

    @HttpCode(HttpStatus.OK)
    @Get()
    async get(@Body() body: SignInDto) {
        return await this.service.signIn(body.username, body.password);
    }

    @HttpCode(HttpStatus.OK)
    @Get('refresh_token')
    getMe(@Headers() header: RefreshTokenDto) {
        return this.service.verifyRefreshToken(header.refreshToken);
    }
}
