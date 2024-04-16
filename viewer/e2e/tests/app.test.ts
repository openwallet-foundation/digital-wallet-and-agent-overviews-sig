
import * as assert from 'assert';
import {describe, it} from 'node:test';

import {setupBrowserHooks, getBrowserState} from './utils';

describe('App test', function () {
  setupBrowserHooks();
  it('is running', async function () {
    const {page} = getBrowserState();
    const element = await page.locator('::-p-text(viewer)').wait();

    assert.ok(element);

  });
});
