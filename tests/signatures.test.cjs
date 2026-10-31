const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

// Exercise the actual registry and matcher embedded in the standalone page.
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const code = html.slice(html.indexOf('  const SIGNATURES = ['), html.indexOf('  function renderSignature()'));
assert.ok(code.startsWith('  const SIGNATURES = ['));
const { identify, signatures, length } = vm.runInNewContext(`${code}\n({identify: identifySignature, signatures: SIGNATURES, length: SIGNATURE_BYTES})`);

test('each registered alternative matches and truncated headers do not', () => {
  for (const type of signatures) for (const pattern of type.patterns) {
    const size = Math.max(...pattern.map(([offset, bytes]) => offset + bytes.length));
    const bytes = new Uint8Array(size);
    for (const [offset, value] of pattern) Array.from(value).forEach((b, i) => { bytes[offset + i] = typeof b === 'string' ? b.charCodeAt(0) : b; });
    assert.equal(identify(bytes)?.name, type.name, type.name);
    assert.notEqual(identify(bytes.slice(0, -1))?.name, type.name, `${type.name} truncated`);
    assert.ok(size <= length);
  }
});

test('unknown and incomplete RIFF headers remain unknown', () => {
  assert.equal(identify(new Uint8Array([0, 1, 2])), null);
  assert.equal(identify(Buffer.from('RIFFxxxxAVI ')), null);
});

test('ZIP is marked as an ambiguous container', () => {
  assert.equal(identify(Buffer.from([0x50, 0x4b, 3, 4])).ambiguous, true);
});
