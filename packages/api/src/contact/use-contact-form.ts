import { useMutation } from '@tanstack/react-query';
import { postContact } from './contact.api';
import type { ContactApiError, ContactPayload, ContactResponse } from './contact.api';

export function useContactForm() {
  return useMutation<ContactResponse, ContactApiError, ContactPayload>({
    mutationFn: postContact,
  });
}
