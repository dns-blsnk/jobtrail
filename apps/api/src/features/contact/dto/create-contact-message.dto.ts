import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactMessageDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'Partnership inquiry' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  subject: string;

  @ApiProperty({ example: 'Hello, I wanted to reach out about...' })
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  message: string;
}
