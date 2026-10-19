import { network } from 'virtual:msw';
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';

import hello from './hello';

const { mockWorld } = vi.hoisted(() => ({
  mockWorld: vi.fn(),
}));

vi.mock(import('./world'), () => ({
  default: mockWorld,
}));

describe('hello()', () => {

  beforeAll(async () => {
    network.configure({});
    await network.enable();
  });

  afterEach(() => {
    network.resetHandlers();
  });

  test('hello_undefined', () => {
    expect(hello()).toEqual('hello_undefined');
  });

  test('hello_world', () => {
    mockWorld.mockReturnValueOnce('world');
    expect(hello()).toEqual('hello_world');
  });
});
