import { IsArray, IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CombinationsInCreateDto {
  @ApiProperty({
    example: [1, 2, 1],
    required: true,
    isArray: true,
    type: Number,
  })
  @Max(26, { each: true })
  @Min(1, { each: true })
  @IsInt({ each: true })
  @IsArray()
  items: number[];

  @ApiProperty({
    required: true,
    type: Number,
    example: 2,
  })
  @Max(26)
  @Min(2)
  @IsInt()
  length: number;
}
