import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApiResponseDto {
    data?: object;
    @IsString()
    @IsNotEmpty()
    readonly message: string;

    @IsNumber()
    @IsNotEmpty()
    readonly statusCode: number;
}
