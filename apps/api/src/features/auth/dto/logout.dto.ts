import type { LogoutDto as ILogoutDto } from '@job-search-tracker/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogoutDto implements ILogoutDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
