-- Ghost Tracker Telemetry Table
-- For internal development and performance auditing only.

CREATE TABLE dev_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    payload JSONB,
    execution_time_ms BIGINT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE dev_audit_log IS 'For internal development and performance auditing. Not user-facing.';
COMMENT ON COLUMN dev_audit_log.event_type IS 'Type of event logged (e.g., "API_CALL", "STATE_CHANGE", "AUTH_EVENT").';
COMMENT ON COLUMN dev_audit_log.payload IS 'JSON data containing API request/response, state diffs, or other metadata.';
COMMENT ON COLUMN dev_audit_log.execution_time_ms IS 'Operation duration in milliseconds.';
COMMENT ON COLUMN dev_audit_log.user_agent IS 'Client user agent for tracking requests from different environments.';
