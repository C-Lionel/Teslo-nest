import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    
    @ApiProperty({
        default: 10,
        description: 'How many rows do you'
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number ) // transforma a un número los params
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'How many rows do you want to skip'
    })
    @IsOptional()
    @Min(0)
    @Type( () => Number ) // Es como tambien implementar enableImplicitConversions: true
    offset?: number;
}