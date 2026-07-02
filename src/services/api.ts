import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { N8N_WEBHOOK_URL } from '@/config/constants';
import type { SubmissionPayload } from '@/types/form';

interface WebhookResponse {
  success: boolean;
}

async function submitApplication(payload: SubmissionPayload): Promise<WebhookResponse> {
  const { data } = await axios.post<WebhookResponse>(N8N_WEBHOOK_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
  });
  return data;
}

/** React-Query-Mutation für den finalen "Bewerbung abschicken"-Klick. */
export function useSubmitApplication() {
  return useMutation({
    mutationFn: submitApplication,
  });
}
