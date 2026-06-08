import { UserRole } from '@job-search-tracker/types';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { JwtStrategy } from '../strategies/jwt.strategy';

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  password: 'hashed',
  name: 'Test User',
  role: 'USER',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let prisma: { user: { findUnique: jest.Mock } };

  beforeEach(async () => {
    prisma = { user: { findUnique: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: PrismaService, useValue: prisma },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('test-secret') },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('returns IUser for valid payload', async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const result = await strategy.validate({ sub: 'user-1', email: 'test@example.com' });
    expect(result.id).toBe('user-1');
    expect(result.email).toBe('test@example.com');
    expect(result.role).toBe(UserRole.USER);
    expect((result as unknown as Record<string, unknown>).password).toBeUndefined();
  });

  it('throws UnauthorizedException when user is not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      strategy.validate({ sub: 'unknown', email: 'no@example.com' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
