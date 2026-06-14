import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/database/prisma.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

interface RequestMeta {
  ip?: string;
  userAgent?: string;
}

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateContactMessageDto, meta?: RequestMeta) {
    console.log({
      name: dto.name,
      email: dto.email,
      subject: dto.subject,
      message: dto.message,
      ip: meta?.ip,
      userAgent: meta?.userAgent,
    })
    return this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
        ip: meta?.ip,
        userAgent: meta?.userAgent,
      },
      select: { id: true, createdAt: true },
    });
  }
}
