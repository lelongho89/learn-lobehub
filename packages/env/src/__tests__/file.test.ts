// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('getFileConfig', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.S3_ENDPOINT;
  });

  it('should treat empty S3 endpoint placeholders as unset', async () => {
    process.env.S3_ENDPOINT = '';

    const { getFileConfig } = await import('../file');
    const config = getFileConfig();

    expect(config.S3_ENDPOINT).toBeUndefined();
  });

  it('should keep configured Supabase S3 endpoint URLs', async () => {
    process.env.S3_ENDPOINT = '" https://project-ref.storage.supabase.co/storage/v1/s3 "';

    const { getFileConfig } = await import('../file');
    const config = getFileConfig();

    expect(config.S3_ENDPOINT).toBe('https://project-ref.storage.supabase.co/storage/v1/s3');
  });
});
