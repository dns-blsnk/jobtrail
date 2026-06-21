import { request } from '@job-search-tracker/api-client';
import type { UpdateProfilePayload, UserProfile } from '../model/types';

export const profileApi = {
  get: (token: string): Promise<UserProfile> => request<UserProfile>('/profile', { token }),

  update: (token: string, data: UpdateProfilePayload): Promise<UserProfile> =>
    request<UserProfile>('/profile', { method: 'PUT', body: data, token }),
};
