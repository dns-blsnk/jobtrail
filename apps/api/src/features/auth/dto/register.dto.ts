import type { RegisterDto as IRegisterDto } from '@job-search-tracker/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto implements IRegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password1', minLength: 8 })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[A-Z]).+$/, {
    message: 'password must contain at least 1 digit and 1 uppercase letter',
  })
  password: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;
}
