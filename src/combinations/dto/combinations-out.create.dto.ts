import { ApiProperty } from '@nestjs/swagger';

export class CombinationsOutCreateDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: [
      ['A1', 'B1'],
      ['A1', 'B2'],
      ['A1', 'C1'],
      ['B1', 'C1'],
      ['B2', 'C1'],
    ],
  })
  combinations: string[][];
}
