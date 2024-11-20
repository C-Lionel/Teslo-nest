import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    
    @IsOptional()
    @IsPositive()
    @Type( () => Number ) // transforma a un número los params
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type( () => Number ) // Es como tambien implementar enableImplicitConversions: true
    offset?: number;
}