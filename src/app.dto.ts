import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ApiResponseDto {
    data?: object;
    @IsString()
    @IsNotEmpty()
    readonly message: string;

    @IsNumber()
    readonly statusCode: number;
}
