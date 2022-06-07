import { zy } from '../src/zy.mjs';

import test from 'node:test';
import assert from 'node:assert';

test('fromZonedDateTime method', t => {
  assert.throws(
    () => zy.fromZonedDateTime(`gwak`),
    TypeError
  );
  assert.throws(
    () => zy.fromZonedDateTime(Temporal.ZonedDateTime.from({
      timeZone: 'UTC',
      year: 59,
      month: 12,
      day: 31,
      hour: 23,
      minute: 59,
      second: 59,
    })),
    RangeError
  );
  assert.strictEqual(
    zy.fromZonedDateTime(Temporal.ZonedDateTime.from({
      timeZone: 'UTC',
      year: 60,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
    })), `1011000`
  );
  assert.strictEqual(
    zy.fromZonedDateTime(Temporal.ZonedDateTime.from({
      timeZone: 'UTC',
      year: 2017,
      month: 3,
      day: 17,
      hour: 10,
      minute: 39,
      second: 13,
    })), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromZonedDateTime(Temporal.ZonedDateTime.from({
      timeZone: 'UTC',
      year: 3599,
      month: 12,
      day: 31,
      hour: 23,
      minute: 59,
      second: 59,
    })), `xxCVNxx`
  );
  assert.throws(
    () => zy.fromZonedDateTime(Temporal.ZonedDateTime.from({
      timeZone: 'UTC',
      year: 3600,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
    })),
    RangeError
  );
});

test('fromDate method', t => {
  assert.throws(
    () => zy.fromDate(`gwak`),
    TypeError
  );
  assert.throws(
    () => zy.fromDate(new Date(
      '0059-12-31T23:59:59.999999999+0000'
    )),
    RangeError
  );
  assert.strictEqual(
    zy.fromDate(new Date(
      '0060-01-01T00:00:00+0000'
    )), `1011000`
  );
  assert.strictEqual(
    zy.fromDate(new Date(
      '2017-03-17T10:39:13+0000'
    )), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromDate(new Date(
      '3599-12-31T23:59:59.999999999+0000'
    )), `xxCVNxx`
  );
  assert.throws(
    () => zy.fromDate(new Date(
      '3600-01-01T00:00:00+0000'
    )),
    RangeError
  );
});

test('fromISO method', t => {
  assert.throws(
    () => zy.fromISO(`gwak`),
    TypeError
  );
  assert.strictEqual(
    zy.fromISO(
      '0060-01-01T00:00:00+0000'
    ), `1011000`
  );
  assert.strictEqual(
    zy.fromISO(
      '2017-03-17T10:39:13+0000'
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromISO(
      '3599-12-31T23:59:59.999999999+0000'
    ), `xxCVNxx`
  );
});

test('fromInstant method', t => {
  assert.throws(
    () => zy.fromInstant(`gwak`),
    TypeError
  );
  assert.throws(
    () => zy.fromInstant(Temporal.Instant.fromEpochNanoseconds(
      -60273763200_000000001n
    )),
    RangeError
  );
  assert.strictEqual(
    zy.fromInstant(Temporal.Instant.fromEpochNanoseconds(
      -60273763200_000000000n
    )), `1011000`
  );
  assert.strictEqual(
    Temporal.Instant.compare(
      Temporal.Instant.fromEpochNanoseconds(
        -60273763200_000000000n
      ), zy.toInstant(`1011000`)
    ), 0
  );
  assert.strictEqual(
    zy.fromInstant(Temporal.Instant.fromEpochNanoseconds(
      1489747153_000000000n
    )), `Xb3HAdD`
  );
  assert.strictEqual(
    Temporal.Instant.compare(
      Temporal.Instant.fromEpochNanoseconds(
        1489747153_000000000n
      ), zy.toInstant(`Xb3HAdD`)
    ), 0
  );
  assert.strictEqual(
    zy.fromInstant(Temporal.Instant.fromEpochNanoseconds(
      51437807999_000000000n
    )), `xxCVNxx`
  );
  assert.strictEqual(
    Temporal.Instant.compare(
      Temporal.Instant.fromEpochNanoseconds(
        51437807999_000000000n
      ), zy.toInstant(`xxCVNxx`)
    ), 0
  );
  assert.strictEqual(
    zy.fromInstant(Temporal.Instant.fromEpochNanoseconds(
      51437807999_000000000n
    )),
    zy.fromInstant(Temporal.Instant.fromEpochNanoseconds(
      51437807999_999999999n
    ))
  );
  assert.throws(
    () => zy.fromInstant(Temporal.Instant.fromEpochNanoseconds(
      51437808000_000000000n
    )),
    RangeError
  );
});

test('fromString method', t => {
  assert.throws(
    () => zy.fromString(`gwak`),
    RangeError
  );
  assert.throws(
    () => zy.fromString(
      '0059-12-31T23:59:59.999999999+0000'
    ),
    RangeError
  );
  assert.strictEqual(
    zy.fromString(
      '0060-01-01T00:00:00+0000'
    ), `1011000`
  );
  assert.strictEqual(
    zy.fromString(
      '2017-03-17T10:39:13+0000'
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromString(
      '3599-12-31T23:59:59.999999999+0000'
    ), `xxCVNxx`
  );
  assert.throws(
    () => zy.fromString(
      '3600-01-01T00:00:00.000000000+0000'
    ),
    RangeError
  );
});

test('fromSeconds method', t => {
  assert.throws(
    () => zy.fromSeconds(`gwak`),
    RangeError
  );
  assert.throws(
    () => zy.fromSeconds(
      -60273763201
    ),
    RangeError
  );
  assert.strictEqual(
    zy.fromSeconds(
      -60273763200
    ), `1011000`
  );
  assert.strictEqual(
    zy.fromSeconds(
      1489747153
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromSeconds(
      51437807999
    ), `xxCVNxx`
  );
  assert.throws(
    () => zy.fromSeconds(
      51437808000
    ),
    RangeError
  );
});

test('fromMilliseconds method', t => {
  assert.throws(
    () => zy.fromMilliseconds(`gwak`),
    RangeError
  );
  assert.throws(
    () => zy.fromMilliseconds(
      -60273763200_001
    ),
    RangeError
  );
  assert.strictEqual(
    zy.fromMilliseconds(
      -60273763200_000
    ), `1011000`
  );
  assert.strictEqual(
    zy.fromMilliseconds(
      1489747153_000
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromMilliseconds(
      51437807999_999
    ), `xxCVNxx`
  );
  assert.throws(
    () => zy.fromMilliseconds(
      51437808000_000
    ),
    RangeError
  );
});

test('fromMicroseconds method', t => {
  assert.throws(
    () => zy.fromMicroseconds(`gwak`),
    SyntaxError
  );
  assert.throws(
    () => zy.fromMicroseconds(
      -60273763200_000001n
    ),
    RangeError
  );
  assert.strictEqual(
    zy.fromMicroseconds(
      -60273763200_000000n
    ), `1011000`
  );
  assert.strictEqual(
    zy.fromMicroseconds(
      1489747153_000000n
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromMicroseconds(
      51437807999_999999n
    ), `xxCVNxx`
  );
  assert.throws(
    () => zy.fromMicroseconds(
      51437808000_000000n
    ),
    RangeError
  );
});

test('fromNanoseconds method', t => {
  assert.throws(
    () => zy.fromNanoseconds(`gwak`),
    SyntaxError
  );
  assert.throws(
    () => zy.fromNanoseconds(
      -60273763200_000000001n
    ),
    RangeError
  );
  assert.strictEqual(
    zy.fromNanoseconds(
      -60273763200_000000000n
    ), `1011000`
  );
  assert.strictEqual(
    zy.fromNanoseconds(
      1489747153_000000000n
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromNanoseconds(
      51437807999_999999999n
    ), `xxCVNxx`
  );
  assert.throws(
    () => zy.fromNanoseconds(
      51437808000_000000000n
    ),
    RangeError
  );
});

test('fromNumber method', t => {
  assert.throws(
    () => zy.fromNumber(`gwak`),
    RangeError
  );
  assert.throws(
    () => zy.fromNumber(
      -60273763200_001
    ),
    RangeError
  );
  assert.strictEqual(
    zy.fromNumber(
      -60273763200_000
    ), `1011000`
  );
  assert.strictEqual(
    zy.fromNumber(
      -60273763199
    ), `1011001`
  );
  assert.strictEqual(
    zy.fromNumber(
      -60273763200
    ), `Wm239HG`
  );
  assert.strictEqual(
    zy.fromNumber(
      1489747153_000
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromNumber(
      1489747153
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromNumber(
      51437807999_999
    ), `xxCVNxx`
  );
  assert.strictEqual(
    zy.fromNumber(
      51437807998
    ), `xxCVNxw`
  );
  assert.strictEqual(
    zy.fromNumber(
      51437807999
    ), `Wp8J8Gl`
  );
  assert.throws(
    () => zy.fromNumber(
      51437808000_000
    ),
    RangeError
  );
});

test('fromBigInt method', t => {
  assert.throws(
    () => zy.fromBigInt(`gwak`),
    SyntaxError
  );
  assert.throws(
    () => zy.fromBigInt(
      -60273763200_000000001n
    ),
    RangeError
  );
  assert.strictEqual(
    zy.fromBigInt(
      -60273763200_000000000n
    ), `1011000`
  );
  assert.strictEqual(
    zy.fromBigInt(
      -60273763199_000000n
    ), `1011001`
  );
  assert.strictEqual(
    zy.fromBigInt(
      -60273763200_000000n
    ), `Wm239HG`
  );
  assert.strictEqual(
    zy.fromBigInt(
      1489747153_000000000n
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromBigInt(
      1489747153_000000n
    ), `Xb3HAdD`
  );
  assert.strictEqual(
    zy.fromBigInt(
      51437807999_999999999n
    ), `xxCVNxx`
  );
  assert.strictEqual(
    zy.fromBigInt(
      51437807998_999999n
    ), `xxCVNxw`
  );
  assert.strictEqual(
    zy.fromBigInt(
      51437807999_999999n
    ), `Wp8J8Gl`
  );
  assert.throws(
    () => zy.fromBigInt(
      51437808000_000000000n
    ),
    RangeError
  );
});
