import { UserRole } from '@job-search-tracker/types';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../strategies/local.strategy';

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: UserRole.USER,
  createdAt: new Date(),
};

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: jest.Mocked<Pick<AuthService, 'validateUser'>>;

  beforeEach(async () => {
    authService = { validateUser: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, { provide: AuthService, useValue: authService }],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('returns user for valid email and password', async () => {
    authService.validateUser.mockResolvedValue(mockUser);

    const result = await strategy.validate('test@example.com', 'Password1');
    expect(result).toEqual(mockUser);
    expect(authService.validateUser).toHaveBeenCalledWith('test@example.com', 'Password1');
  });

  it('throws UnauthorizedException for invalid credentials', async () => {
    authService.validateUser.mockResolvedValue(null);

    await expect(strategy.validate('test@example.com', 'wrong')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
