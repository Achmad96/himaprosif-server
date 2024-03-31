import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}

export class UpdatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
