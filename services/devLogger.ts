
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
export const logDevEvent = async (payload: LogPayload) => {
  // Only run the logger in a development environment
  if (import.meta.env.VITE_APP_ENV !== 'development') {
    return;
  }

  try {
    const { data, error } = await supabase
      .from('dev_audit_log')
      .insert([
        {
          event_type: payload.event_type,
          payload: payload.metadata, // Corrected from metadata to payload to match the DB schema
          execution_time: payload.execution_time,
        },
      ]);

    if (error) {
      console.error('Ghost Tracker Error:', error.message);
    }
  } catch (err: any) {
    console.error('Failed to log dev event:', err.message);
  }
};
