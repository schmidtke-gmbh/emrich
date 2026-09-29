import { buildSubmissionHandler } from './lib/leadtable-forwarder.mjs';

export const handler = buildSubmissionHandler({
  endpoint: process.env.EMRICH_LEADTABLE_WEBHOOK_URL,
});
