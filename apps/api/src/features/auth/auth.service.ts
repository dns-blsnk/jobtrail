import { AuthResponse, IUser, OAuthProfile, UserRole } from '@job-search-tracker/types';
import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import type { Provider, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../modules/prisma/prisma.service';
import type { RegisterDto } from './dto/register.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hashed, name: dto.name ?? null },
    });

    this.logger.log(`User registered: ${user.email}`);
    const tokens = await this.tokenService.generateTokens(user.id, user.email);
    return { user: this.toUserResponse(user), tokens };
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return this.toUserResponse(user);
  }

  async login(user: IUser, meta: { userAgent?: string; ip?: string }): Promise<AuthResponse> {
    const tokens = await this.tokenService.generateTokens(user.id, user.email, meta);
    this.logger.log(`User logged in: ${user.email}`);
    return { user, tokens };
  }

  async refresh(userId: string, refreshToken: string): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException();
    const tokens = await this.tokenService.rotateRefreshToken(userId, user.email, refreshToken);
    return { user: this.toUserResponse(user), tokens };
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    await this.tokenService.revokeRefreshToken(userId, refreshToken);
    this.logger.log(`User logged out: ${userId}`);
  }

  async logoutAll(userId: string): Promise<void> {
    await this.tokenService.revokeAllRefreshTokens(userId);
    this.logger.log(`All sessions revoked for user: ${userId}`);
  }

  async findOrCreateOAuthUser(profile: OAuthProfile): Promise<AuthResponse> {
    const providerKey = profile.provider.toUpperCase() as Provider;

    const existing = await this.prisma.oAuthProvider.findUnique({
      where: { provider_providerId: { provider: providerKey, providerId: profile.providerId } },
      include: { user: true },
    });

    if (existing) {
      const tokens = await this.tokenService.generateTokens(
        existing.user.id,
        existing.user.email,
      );
      return { user: this.toUserResponse(existing.user), tokens };
    }

    let user = await this.prisma.user.findUnique({ where: { email: profile.email } });
    if (!user) {
      user = await this.prisma.user.create({
        data: { email: profile.email, password: '', name: profile.name ?? null },
      });
    }

    await this.prisma.oAuthProvider.create({
      data: { provider: providerKey, providerId: profile.providerId, userId: user.id },
    });

    const tokens = await this.tokenService.generateTokens(user.id, user.email);
    return { user: this.toUserResponse(user), tokens };
  }

  private toUserResponse(user: User): IUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
      createdAt: user.createdAt,
    };
  }
}
