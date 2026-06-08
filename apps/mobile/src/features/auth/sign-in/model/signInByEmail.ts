import type { AuthResponse, LoginDto } from '@job-search-tracker/types';
import { signIn } from '../../../../entities/session';

export const signInByEmail = async (payload: LoginDto): Promise<AuthResponse> => {
  return signIn(payload);
};
