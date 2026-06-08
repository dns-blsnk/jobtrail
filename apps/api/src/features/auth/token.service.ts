import type { AuthTokens } from '@job-search-tracker/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'node:crypto';
import { PrismaService } from '../../modules/prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async generateTokens(
    userId: string,
    email: string,
    meta?: { userAgent?: string; ip?: string },
  ): Promise<AuthTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(userId, email),
      this.signRefreshToken(userId, email),
    ]);
    await this.storeRefreshToken(userId, refreshToken, meta);
    return { accessToken, refreshToken };
  }

  async rotateRefreshToken(userId: string, email: string, oldToken: string): Promise<AuthTokens> {
    await this.revokeRefreshToken(userId, oldToken);
    return this.generateTokens(userId, email);
  }

  async revokeRefreshToken(userId: string, token: string): Promise<void> {
    const hash = this.hashToken(token);
    await this.prisma.refreshToken.deleteMany({ where: { userId, token: hash } });
  }

  async revokeAllRefreshTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }

  async validateRefreshToken(userId: string, token: string): Promise<boolean> {
    const hash = this.hashToken(token);
    const stored = await this.prisma.refreshToken.findFirst({
      where: { userId, token: hash, expiresAt: { gt: new Date() } },
    });
    return stored !== null;
  }

  private async signAccessToken(userId: string, email: string): Promise<string> {
    return this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES', '15m') as unknown as number,
      },
    );
  }

  private async signRefreshToken(userId: string, email: string): Promise<string> {
    return this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES', '7d') as unknown as number,
      },
    );
  }

  private async storeRefreshToken(
    userId: string,
    token: string,
    meta?: { userAgent?: string; ip?: string },
  ): Promise<void> {
    const hash = this.hashToken(token);
    const expiresAt = new Date(
      Date.now() +
        this.parseDuration(this.configService.get<string>('JWT_REFRESH_EXPIRES', '7d')),
    );
    await this.prisma.refreshToken.create({
      data: { token: hash, userId, expiresAt, userAgent: meta?.userAgent, ip: meta?.ip },
    });
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private parseDuration(duration: string): number {
    const match = /^(\d+)([smhd])$/.exec(duration);
    if (!match) return 604_800_000; // 7d fallback
    const value = parseInt(match[1], 10);
    const multipliers: Record<string, number> = {
      s: 1_000,
      m: 60_000,
      h: 3_600_000,
      d: 86_400_000,
    };
    return value * multipliers[match[2]];
  }
}
