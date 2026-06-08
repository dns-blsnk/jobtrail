import type { AuthResponse, RegisterDto } from '@job-search-tracker/types';
import { signUp } from '../../../../entities/session/api/auth-api';

export const signUpByEmail = async (payload: RegisterDto): Promise<AuthResponse> => {
  return signUp(payload);
};
