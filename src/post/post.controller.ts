import { BadRequestException, Body, Controller, Delete, Get, GoneException, Headers, Inject, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/auth/auth.guard';
import { AuthService } from '@/auth/auth.service';

import { PostService } from '@/post/post.service';
import { CreatePostDto, UpdatePostDto } from '@/post/post.dto';

import { ApiResponseDto } from '@/app.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('admin/posts')
export class PostController {
    @Inject()
    private readonly postService: PostService;

    @Inject()
    private readonly authService: AuthService;

    @Get()
    async findPostById(@Query('id') id: string): Promise<ApiResponseDto> {
        if (id) {
            return this.postService.getPostById(id).then((post) => {
                if (post === null) {
                    throw new BadRequestException('Post not found');
                }
                return {
                    data: post,
                    message: 'Post found',
                    statusCode: 200,
                };
            });
        }

        return {
            data: null,
            message: 'Post not found',
            statusCode: 404,
        };
    }

    @Get(':page')
    async getPosts(@Param('page') page: string): Promise<ApiResponseDto> {
        const pageSize = await this.postService.getPostsSize();
        const posts = await this.postService.getPosts(Number(page));
        if (pageSize === 0) throw new BadRequestException("There's no posts available");
        return {
            data: { ...posts, page, pageSize },
            message: 'Success getting posts',
            statusCode: 200,
        };
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Headers() headers: Headers, @Body() body: CreatePostDto): Promise<ApiResponseDto> {
        const token = this.authService.extractTokenFromHeader(headers);
        const authorId = this.authService.getAuthorIdByToken(token);
        const { title, content } = body;

        return this.postService.createPost(authorId, title, content).then((data) => ({
            data,
            message: 'Post created successfully',
            statusCode: 201,
        }));
    }

    @UseGuards(AuthGuard)
    @Patch(':postId')
    async edit(@Param('postId') postId: string, @Headers() headers: Headers, @Body() body: UpdatePostDto): Promise<ApiResponseDto> {
        const token = this.authService.extractTokenFromHeader(headers);
        const authorId = this.authService.getAuthorIdByToken(token);
        const { title, content } = body;

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

    @UseGuards(AuthGuard)
    @Delete(':postId')
    async delete(@Param('postId') postId: string, @Headers() headers: Headers): Promise<ApiResponseDto> {
        const token = this.authService.extractTokenFromHeader(headers);
        const authorId = this.authService.getAuthorIdByToken(token);

        return this.postService
            .deletePost(authorId, postId)
            .then((data) => ({
                data,
                message: 'Post deleted successfully',
                statusCode: 200,
            }))
            .catch(() => {
                throw new GoneException('Post not found');
            });
    }
}
