import { supabase } from './supabaseClient';

interface LogPayload {
  event_type: string;
  metadata: Record<string, any>;
  execution_time?: number;
}

/**
 * Logs a development event to the dev_audit_log table in Supabase.
 * This function will only run if the environment is set to development.
 * @param {LogPayload} payload - The data to be logged.
 */
export const logDevEvent = async (eventType: string, metadata: any) => {
  if (!import.meta.env.DEV || !supabase) {
    return;
  }

  const payload = {
    event_type: eventType,
    metadata,
    timestamp: new Date().toISOString(),
  };

  try {
    // Explicitly cast the response so TypeScript can see 'data' and 'error'
    const { data, error } = await (supabase
      .from('dev_audit_log')
      .insert([payload]) as any);

    if (error) {
      console.warn('[devLogger] Supabase insert error:', error);
    }
  } catch (err) {
    console.warn('[devLogger] Failed to log event:', err);
  }
};
