export interface OAuthProfile {
  provider: 'google' | 'github' | 'linkedin';
  providerId: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface OAuthCallbackDto {
  code: string;
}
