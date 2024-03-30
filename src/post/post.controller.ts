import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    GoneException,
    Headers,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { PostService } from './post.service';
import { AuthService } from '../auth/auth.service';

import { CreatePostDto, UpdatePostDto } from './post.dto';
import { ApiResponseDto } from '../response.dto';

@Controller('admin/posts')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly authService: AuthService,
    ) {}

    // prettier-ignore
    @Get(':postId')
    async getPostById(@Param('postId') postId: string): Promise<ApiResponseDto> {
        return await this.postService.getPostById(postId).then((data) => ({
            data,
            message: 'Success getting posts',
            statusCode: 200,
        }));
    }

    @Get()
    async getPosts(): Promise<ApiResponseDto> {
        return await this.postService.getPosts().then((data) => ({
            data,
            message: 'Success getting posts',
            statusCode: 200,
        }));
    }

    // prettier-ignore
    @UseGuards(AuthGuard)
    @Post()
    async create(@Headers() headers: Headers, @Body() body: CreatePostDto): Promise<ApiResponseDto> {
        const token = this.authService.extractTokenFromHeader(headers);
        const authorId = this.authService.getAuthorId(token);
        const { title, content } = body;
        
        if (!title || !content)
            throw new BadRequestException('title and content are required');

        return this.postService
            .createPost(authorId, title, content)
            .then((data) => ({
                data,
                message: 'Post created successfully',
                statusCode: 201,
            }));
    }

    // prettier-ignore
    @UseGuards(AuthGuard)
    @Patch(':postId')
    async edit(@Param('postId') postId: string, @Headers() headers: Headers, @Body() body: UpdatePostDto): Promise<ApiResponseDto> {
        const token = this.authService.extractTokenFromHeader(headers);
        const authorId = this.authService.getAuthorId(token);
        const { title, content } = body;

        if (!title || !content)
            throw new BadRequestException('title and content are required');
        return this.postService
            .editPost(authorId, postId, title, content)
            .then((data) => ({
                data,
                message: 'Post edited successfully',
                statusCode: 201,
            }))
            .catch(() => {
                throw new NotFoundException('Post not found');
            });
    }

    // prettier-ignore
    @UseGuards(AuthGuard)
    @Delete(':postId')
    async delete(@Param('postId') postId: string, @Headers() headers: Headers): Promise<ApiResponseDto> {
        const token = this.authService.extractTokenFromHeader(headers);
        const authorId = this.authService.getAuthorId(token);

        return this.postService
            .deletePost(authorId, postId)
            .then((data) => ({
                data,
                message: 'Post deleted successfully',
                statusCode: 200,
            }))
            .catch(() => {
                throw new GoneException('Error deleting post');
            });
    }
}
