import { zy } from '../src/zy.mjs';

import test from 'node:test';
import assert from 'node:assert';

function wrap(fn) {
  ['', 'z', 'zzz', 'z'.repeat(99)].forEach(ż => {
  ['', 'y', 'yyy', 'y'.repeat(99)].forEach(ẏ => {
    fn(ż, ẏ);
  });
  });
}

test('toObject method', t => {
  wrap((ż, ẏ) => {
    assert.throws(
      () => zy.toObject(`${ż}gwak${ẏ}`),
      TypeError
    );
    assert.deepStrictEqual(
      zy.toObject(`${ż}1011000${ẏ}`),
      { __proto__: null,
        year: 60,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
      }
    );
    assert.deepStrictEqual(
      zy.toObject(`${ż}Xb3HAdD${ẏ}`),
      { __proto__: null,
        year: 2017,
        month: 3,
        day: 17,
        hour: 10,
        minute: 39,
        second: 13,
      }
    );
    assert.deepStrictEqual(
      zy.toObject(`${ż}xxCVNxx${ẏ}`),
      { __proto__: null,
        year: 3599,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59,
      }
    );
  });
});

test('toZonedDateTime method', t => {
  wrap((ż, ẏ) => {
    assert.throws(
      () => zy.toZonedDateTime(`${ż}gwak${ẏ}`),
      TypeError
    );
    assert.throws(
      () => zy.toZonedDateTime(`${ż}1010Pxx${ẏ}`),
      RangeError
    );
    assert.strictEqual(
      Temporal.ZonedDateTime.compare(
        Temporal.ZonedDateTime.from({
          timeZone: 'UTC',
          year: 60,
          month: 1,
          day: 1,
          hour: 0,
          minute: 0,
          second: 0,
        }), zy.toZonedDateTime(`${ż}1011000${ẏ}`)
      ), 0
    );
    assert.strictEqual(
      Temporal.ZonedDateTime.compare(
        Temporal.ZonedDateTime.from({
          timeZone: 'UTC',
          year: 2017,
          month: 3,
          day: 17,
          hour: 10,
          minute: 39,
          second: 13,
        }), zy.toZonedDateTime(`${ż}Xb3HAdD${ẏ}`)
      ), 0
    );
    assert.strictEqual(
      Temporal.ZonedDateTime.compare(
        Temporal.ZonedDateTime.from({
          timeZone: 'UTC',
          year: 3599,
          month: 12,
          day: 31,
          hour: 23,
          minute: 59,
          second: 59,
        }), zy.toZonedDateTime(`${ż}xxCVNxx${ẏ}`)
      ), 0
    );
    assert.strictEqual(
      Temporal.ZonedDateTime.compare(
        zy.toZonedDateTime(`${ż}xxCVNxx${ẏ}`),
        zy.toZonedDateTime(`${ż}xxxxxxx${ẏ}`)
      ), 0
    );
  });
});

test('toInstant method', t => {
  wrap((ż, ẏ) => {
    assert.throws(
      () => zy.toZonedDateTime(`${ż}gwak${ẏ}`),
      TypeError
    );
    assert.throws(
      () => zy.toZonedDateTime(`${ż}1010Pxx${ẏ}`),
      RangeError
    );
    assert.strictEqual(
      Temporal.Instant.compare(
        Temporal.Instant.fromEpochNanoseconds(
          -60273763200_000000000n
        ), zy.toInstant(`${ż}1011000${ẏ}`)
      ), 0
    );
    assert.strictEqual(
      Temporal.Instant.compare(
        Temporal.Instant.fromEpochNanoseconds(
          1489747153_000000000n
        ), zy.toInstant(`${ż}Xb3HAdD${ẏ}`)
      ), 0
    );
    assert.strictEqual(
      Temporal.Instant.compare(
        Temporal.Instant.fromEpochNanoseconds(
          51437807999_000000000n
        ), zy.toInstant(`${ż}xxCVNxx${ẏ}`)
      ), 0
    );
    assert.strictEqual(
      Temporal.Instant.compare(
        zy.toInstant(`${ż}xxCVNxx${ẏ}`),
        zy.toInstant(`${ż}xxxxxxx${ẏ}`)
      ), 0
    );
  });
});

test('toISO method', t => {
  wrap((ż, ẏ) => {
    assert.throws(
      () => zy.toISO(`${ż}gwak${ẏ}`),
      TypeError
    );
    assert.throws(
      () => zy.toISO(`${ż}1010Pxx${ẏ}`),
      RangeError
    );
    assert.strictEqual(
      zy.toISO(`${ż}1011000${ẏ}`),
      '0060-01-01T00:00:00Z'
    );
    assert.strictEqual(
      zy.toISO(`${ż}Xb3HAdD${ẏ}`),
      '2017-03-17T10:39:13Z'
    );
    assert.strictEqual(
      zy.toISO(`${ż}xxCVNxx${ẏ}`),
      '3599-12-31T23:59:59Z'
    );
    assert.strictEqual(
      zy.toISO(`${ż}xxCVNxx${ẏ}`),
      zy.toISO(`${ż}xxxxxxx${ẏ}`)
    );
  });
});

test('toSeconds method', t => {
  wrap((ż, ẏ) => {
    assert.throws(
      () => zy.toSeconds(`${ż}gwak${ẏ}`),
      TypeError
    );
    assert.throws(
      () => zy.toSeconds(`${ż}1010Pxx${ẏ}`),
      RangeError
    );
    assert.strictEqual(
      zy.toSeconds(`${ż}1011000${ẏ}`),
      -60273763200
    );
    assert.strictEqual(
      zy.toSeconds(`${ż}Xb3HAdD${ẏ}`),
      1489747153
    );
    assert.strictEqual(
      zy.toSeconds(`${ż}xxCVNxx${ẏ}`),
      51437807999
    );
    assert.strictEqual(
      zy.toSeconds(`${ż}xxCVNxx${ẏ}`),
      zy.toSeconds(`${ż}xxxxxxx${ẏ}`)
    );
  });
});

test('toMilliseconds method', t => {
  wrap((ż, ẏ) => {
    assert.throws(
      () => zy.toMilliseconds(`${ż}gwak${ẏ}`),
      TypeError
    );
    assert.throws(
      () => zy.toMilliseconds(`${ż}1010Pxx${ẏ}`),
      RangeError
    );
    assert.strictEqual(
      zy.toMilliseconds(`${ż}1011000${ẏ}`),
      -60273763200_000
    );
    assert.strictEqual(
      zy.toMilliseconds(`${ż}Xb3HAdD${ẏ}`),
      1489747153_000
    );
    assert.strictEqual(
      zy.toMilliseconds(`${ż}xxCVNxx${ẏ}`),
      51437807999_000
    );
    assert.strictEqual(
      zy.toMilliseconds(`${ż}xxCVNxx${ẏ}`),
      zy.toMilliseconds(`${ż}xxxxxxx${ẏ}`)
    );
  });
});

test('toMicroseconds method', t => {
  wrap((ż, ẏ) => {
    assert.throws(
      () => zy.toMicroseconds(`${ż}gwak${ẏ}`),
      TypeError
    );
    assert.throws(
      () => zy.toMicroseconds(`${ż}1010Pxx${ẏ}`),
      RangeError
    );
    assert.strictEqual(
      zy.toMicroseconds(`${ż}1011000${ẏ}`),
      -60273763200_000000n
    );
    assert.strictEqual(
      zy.toMicroseconds(`${ż}Xb3HAdD${ẏ}`),
      1489747153_000000n
    );
    assert.strictEqual(
      zy.toMicroseconds(`${ż}xxCVNxx${ẏ}`),
      51437807999_000000n
    );
    assert.strictEqual(
      zy.toMicroseconds(`${ż}xxCVNxx${ẏ}`),
      zy.toMicroseconds(`${ż}xxxxxxx${ẏ}`)
    );
  });
});

test('toNanoseconds method', t => {
  wrap((ż, ẏ) => {
    assert.throws(
      () => zy.toNanoseconds(`${ż}gwak${ẏ}`),
      TypeError
    );
    assert.throws(
      () => zy.toNanoseconds(`${ż}1010Pxx${ẏ}`),
      RangeError
    );
    assert.strictEqual(
      zy.toNanoseconds(`${ż}1011000${ẏ}`),
      -60273763200_000000000n
    );
    assert.strictEqual(
      zy.toNanoseconds(`${ż}Xb3HAdD${ẏ}`),
      1489747153_000000000n
    );
    assert.strictEqual(
      zy.toNanoseconds(`${ż}xxCVNxx${ẏ}`),
      51437807999_000000000n
    );
    assert.strictEqual(
      zy.toNanoseconds(`${ż}xxCVNxx${ẏ}`),
      zy.toNanoseconds(`${ż}xxxxxxx${ẏ}`)
    );
  });
});
