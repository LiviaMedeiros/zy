import { zy as src } from '../src/zy.mjs';
import { zy as dist } from '../dist/zy.mjs';

import test from 'node:test';
import assert from 'node:assert';

const run = async ([ version, zy ], t) => {
  await t.test(`validInstant method on ${version}`, t => {
    assert.throws(
      () => zy.validInstant('gwak'),
      TypeError
    );
    assert.throws(
      () => zy.validInstant(Temporal.Instant.fromEpochNanoseconds(
        -60273763200_000000001n
      )),
      RangeError
    );
    assert.deepStrictEqual(
      zy.validInstant(Temporal.Instant.fromEpochNanoseconds(
        -60273763200_000000000n
      )),
      Temporal.Instant.fromEpochNanoseconds(
        -60273763200_000000000n
      )
    );
    assert.deepStrictEqual(
      zy.validInstant(Temporal.Instant.fromEpochNanoseconds(
        1489747153_000000000n
      )),
      Temporal.Instant.fromEpochNanoseconds(
        1489747153_000000000n
      )
    );
    assert.deepStrictEqual(
      zy.validInstant(Temporal.Instant.fromEpochNanoseconds(
        51437807999_999999999n
      )),
      Temporal.Instant.fromEpochNanoseconds(
        51437807999_999999999n
      )
    );
    assert.throws(
      () => zy.validInstant(Temporal.Instant.fromEpochNanoseconds(
        51437808000_000000000n
      )),
      RangeError
    );
  });

  await t.test(`validZonedDateTime method on ${version}`, t => {
    assert.throws(
      () => zy.validZonedDateTime('gwak'),
      TypeError
    );
    assert.throws(
      () => zy.validZonedDateTime(Temporal.ZonedDateTime.from({
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
    assert.deepStrictEqual(
      zy.validZonedDateTime(Temporal.ZonedDateTime.from({
        timeZone: 'UTC',
        year: 60,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
      })),
      Temporal.ZonedDateTime.from({
        timeZone: 'UTC',
        year: 60,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
      })
    );
    assert.deepStrictEqual(
      zy.validZonedDateTime(Temporal.ZonedDateTime.from({
        timeZone: 'UTC',
        year: 2017,
        month: 3,
        day: 17,
        hour: 10,
        minute: 39,
        second: 13,
      })),
      Temporal.ZonedDateTime.from({
        timeZone: 'UTC',
        year: 2017,
        month: 3,
        day: 17,
        hour: 10,
        minute: 39,
        second: 13,
      })
    );
    assert.deepStrictEqual(
      zy.validZonedDateTime(Temporal.ZonedDateTime.from({
        timeZone: 'UTC',
        year: 3599,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59,
      })),
      Temporal.ZonedDateTime.from({
        timeZone: 'UTC',
        year: 3599,
        month: 12,
        day: 31,
        hour: 23,
        minute: 59,
        second: 59,
      })
    );
    assert.throws(
      () => zy.validZonedDateTime(Temporal.ZonedDateTime.from({
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

  await t.test(`validDate method on ${version}`, t => {
    assert.throws(
      () => zy.validDate('gwak'),
      TypeError
    );
    assert.throws(
      () => zy.validDate(new Date(
        -60273763200_001
      )),
      RangeError
    );
    assert.deepStrictEqual(
      zy.validDate(new Date(
        -60273763200_000
      )),
      new Date(
        -60273763200_000
      )
    );
    assert.deepStrictEqual(
      zy.validDate(new Date(
        1489747153_000
      )),
      new Date(
        1489747153_000
      )
    );
    assert.deepStrictEqual(
      zy.validDate(new Date(
        51437807999_999
      )),
      new Date(
        51437807999_999
      )
    );
    assert.throws(
      () => zy.validDate(new Date(
        51437808000_000
      )),
      RangeError
    );
  });
};

test('valid* methods', async t => {
  await Promise.all(Object.entries({ src, dist }).map(zy => run(zy, t)));
});
