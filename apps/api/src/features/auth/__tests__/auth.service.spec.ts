import { UserRole } from '@job-search-tracker/types';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn(),
}));

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  password: 'hashed_password',
  name: 'Test User',
  role: 'USER',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

const mockTokens = { accessToken: 'access_token', refreshToken: 'refresh_token' };

const prismaMock = {
  user: { findUnique: jest.fn(), create: jest.fn() },
  oAuthProvider: { findUnique: jest.fn(), create: jest.fn() },
};

const tokenServiceMock = {
  generateTokens: jest.fn().mockResolvedValue(mockTokens),
  rotateRefreshToken: jest.fn().mockResolvedValue(mockTokens),
  revokeRefreshToken: jest.fn().mockResolvedValue(undefined),
  revokeAllRefreshTokens: jest.fn().mockResolvedValue(undefined),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    tokenServiceMock.generateTokens.mockResolvedValue(mockTokens);
    tokenServiceMock.rotateRefreshToken.mockResolvedValue(mockTokens);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: TokenService, useValue: tokenServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('creates user and returns tokens', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(mockUser);

      const result = await service.register({ email: 'test@example.com', password: 'Password1' });

      expect(result.user.email).toBe('test@example.com');
      expect(result.tokens).toEqual(mockTokens);
    });

    it('throws ConflictException when email is taken', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      await expect(
        service.register({ email: 'test@example.com', password: 'Password1' }),
      ).rejects.toThrow(ConflictException);
    });

    it('does not return password field in response', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue(mockUser);

      const result = await service.register({ email: 'test@example.com', password: 'Password1' });

      expect((result.user as unknown as Record<string, unknown>).password).toBeUndefined();
    });
  });

  describe('validateUser', () => {
    it('returns user when credentials are valid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'Password1');

      expect(result).not.toBeNull();
      expect(result?.email).toBe('test@example.com');
    });

    it('returns null when email is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await service.validateUser('unknown@example.com', 'Password1');
      expect(result).toBeNull();
    });

    it('returns null when password is wrong', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'WrongPassword1');
      expect(result).toBeNull();
    });

    it('returns null for both invalid email and wrong password (no info leak)', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const result1 = await service.validateUser('no@email.com', 'Password1');

      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const result2 = await service.validateUser('test@example.com', 'WrongPassword1');

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });
  });

  describe('login', () => {
    it('returns tokens for valid user', async () => {
      const user = {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test',
        role: UserRole.USER,
        createdAt: new Date(),
      };

      const result = await service.login(user, { userAgent: 'jest', ip: '127.0.0.1' });

      expect(result.tokens).toEqual(mockTokens);
      expect(result.user).toEqual(user);
    });
  });

  describe('refresh', () => {
    it('returns new tokens for valid refresh token', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.refresh('user-1', 'valid_refresh_token');
      expect(result.tokens).toEqual(mockTokens);
    });

    it('throws UnauthorizedException when user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(service.refresh('unknown-id', 'token')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('revokes the refresh token', async () => {
      await service.logout('user-1', 'refresh_token');
      expect(tokenServiceMock.revokeRefreshToken).toHaveBeenCalledWith('user-1', 'refresh_token');
    });
  });

  describe('findOrCreateOAuthUser', () => {
    const oAuthProfile = {
      provider: 'google' as const,
      providerId: 'google-123',
      email: 'oauth@example.com',
      name: 'OAuth User',
    };

    it('returns existing user when providerId is found', async () => {
      prismaMock.oAuthProvider.findUnique.mockResolvedValue({ user: mockUser });

      const result = await service.findOrCreateOAuthUser(oAuthProfile);

      expect(result.user.email).toBe(mockUser.email);
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });

    it('creates new user when providerId is not found', async () => {
      prismaMock.oAuthProvider.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue(null);
      prismaMock.user.create.mockResolvedValue({ ...mockUser, email: oAuthProfile.email });
      prismaMock.oAuthProvider.create.mockResolvedValue({});

      const result = await service.findOrCreateOAuthUser(oAuthProfile);

      expect(prismaMock.user.create).toHaveBeenCalled();
      expect(result.tokens).toEqual(mockTokens);
    });

    it('links provider to existing email without creating duplicate user', async () => {
      prismaMock.oAuthProvider.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      prismaMock.oAuthProvider.create.mockResolvedValue({});

      await service.findOrCreateOAuthUser(oAuthProfile);

      expect(prismaMock.user.create).not.toHaveBeenCalled();
      expect(prismaMock.oAuthProvider.create).toHaveBeenCalled();
    });
  });
});
