import { useMutation } from '@tanstack/react-query';
import { postContact } from '../api/contact-api';
import type { ContactApiError, ContactPayload, ContactResponse } from '../api/contact-api';

export function useContactForm() {
  return useMutation<ContactResponse, ContactApiError, ContactPayload>({
    mutationFn: postContact,
  });
}
