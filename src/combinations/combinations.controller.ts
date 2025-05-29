import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CombinationsInCreateDto, CombinationsOutCreateDto } from './dto';
import { CombinationsService } from './combinations.service';

@ApiTags('Combinations')
@Controller('combinations')
export class CombinationsController {
  constructor(private readonly combinationsService: CombinationsService) {}

  @ApiOperation({ summary: 'Generate combinations' })
  @ApiResponse({ status: 200, type: CombinationsOutCreateDto })
  @Post()
  create(
    @Body() body: CombinationsInCreateDto,
  ): Promise<CombinationsOutCreateDto> {
    return this.combinationsService.generateCombinations(body);
  }
}
