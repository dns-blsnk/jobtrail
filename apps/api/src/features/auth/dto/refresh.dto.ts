import type { RefreshDto as IRefreshDto } from '@job-search-tracker/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto implements IRefreshDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
