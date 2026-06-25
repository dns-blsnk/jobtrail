import type { UserProfile } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import type { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  getOrCreate(userId: string): Promise<UserProfile> {
    return this.prisma.userProfile.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
  }

  update(userId: string, dto: UpdateProfileDto): Promise<UserProfile> {
    const data = {
      ...dto,
      availableFrom: dto.availableFrom ? new Date(dto.availableFrom) : undefined,
    };

    return this.prisma.userProfile.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  }
}
