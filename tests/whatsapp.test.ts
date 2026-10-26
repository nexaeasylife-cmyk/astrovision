import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMessage, whatsappUrl } from '../src/lib/whatsapp';
test('optional names do not leave blank placeholders', () => { assert.equal(buildMessage('Career'), 'Namaste, I would like to know more about Career. Please let me know the next step.'); });
test('message survives URL encoding', () => { const message = buildMessage('Family & relationships', ' Asha ', 'Hindi'); const url = whatsappUrl('919876543210', message); assert.ok(url); assert.equal(new URL(url).searchParams.get('text'), message); assert.ok(message.includes('Asha')); });
test('missing and malformed destinations cannot open WhatsApp', () => { for (const phone of ['', '+919876543210', '0000000', '123', 'javascript:alert(1)']) assert.equal(whatsappUrl(phone, 'hello'), null); });
