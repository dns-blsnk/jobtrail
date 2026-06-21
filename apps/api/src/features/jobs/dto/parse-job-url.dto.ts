import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ParseJobUrlDto {
  @ApiProperty({ example: 'https://www.linkedin.com/jobs/view/3900000000' })
  @IsUrl({ require_protocol: true })
  url: string;
}
