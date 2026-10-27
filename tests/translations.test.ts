import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (locale: string): Record<string, string> => JSON.parse(readFileSync(`public/locales/${locale}.json`, 'utf8'));
const source = read('en');
for (const locale of ['el', 'fr', 'nl', 'tr', 'hi']) {
 test(`${locale} covers all source text without empty strings or model artifacts`, () => {
  const dictionary = read(locale);
  for (const key of Object.keys(source)) {
   assert.equal(typeof dictionary[key], 'string', `Missing ${locale}: ${key}`);
   assert.ok(dictionary[key].trim(), `Empty ${locale}: ${key}`);
   assert.ok(!/<unk>|▁/.test(dictionary[key]), `Invalid translation ${locale}: ${key}`);
   assert.ok(dictionary[key].length < key.length * 5 + 100, `Runaway translation ${locale}: ${key}`);
  }
  assert.notEqual(dictionary['Book Appointment'], 'Book Appointment');
  assert.equal(dictionary['AstroVision'], 'AstroVision');
 });
}
