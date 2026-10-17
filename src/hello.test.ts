import { setupWorker, SetupWorker } from 'msw/browser';
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';

import hello from './hello';

const { mockWorld } = vi.hoisted(() => ({
  mockWorld: vi.fn(),
}));

vi.mock(import('./world'), () => ({
  default: mockWorld,
}));

describe('hello()', () => {

  let worker :SetupWorker;

  beforeAll(async () => {
    worker = setupWorker();
    await worker.start({
      onUnhandledFrame: 'bypass',
    });
  });

  afterEach(() => {
    worker.resetHandlers();
  });

  test('hello_undefined', () => {
    expect(hello()).toEqual('hello_undefined');
  });

  test('hello_world', () => {
    mockWorld.mockReturnValueOnce('world');
    expect(hello()).toEqual('hello_world');
  });
});
