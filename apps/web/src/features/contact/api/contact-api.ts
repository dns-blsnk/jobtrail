export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  createdAt: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

export class ContactApiError extends Error {
  readonly fields?: ContactFieldErrors;

  constructor(message: string, fields?: ContactFieldErrors) {
    super(message);
    this.name = 'ContactApiError';
    this.fields = fields;
  }
}

import { API_BASE_URL } from '@/shared/config/api.config';

export async function postContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    const message =
      typeof body.message === 'string'
        ? body.message
        : 'Failed to send message';
    const fields =
      body.fields != null && typeof body.fields === 'object'
        ? (body.fields as ContactFieldErrors)
        : undefined;
    throw new ContactApiError(message, fields);
  }

  return res.json() as Promise<ContactResponse>;
}
