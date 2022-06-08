# zy

`zy` is a compact alphanumeric datetime format. This repository contains a basic JavaScript implementation for it.

The format is essentially an [ISO 8601](https://www.iso.org/obp/ui/#iso:std:iso:8601:-1:ed-1:v1:en)/[RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) with each part represented in base60 and all delimiters removed.

```yaml
1011000: 0060-01-01T00:00:00Z
1234567: 0062-03-04T05:06:07Z
Wo11000: 1970-01-01T00:00:00Z
Xb3HAdD: 2017-03-17T10:39:13Z
xxCVNxx: 3599-12-31T23:59:59Z
```

# Installation

```console
$ npm i @liviamedeiros/zy
```

`zy` executie allows encoding datetime from string, decoding zy timestamp to string, or printing current zy timestamp.

`src/zy.mjs` is the main export file.

`dist/zy.mjs` is a minified export file for browsers and similar environments.

# Usage

Assuming current time to be `2022-06-04T10:42:37Z`:

```console
$ zy # Xg64Agb
$ zy Xb3HAdD # 2017-03-17T10:39:13Z
$ zy 2017-03-17T10:39:13Z # Xb3HAdD
```

```mjs
import { zy } from '@liviamedeiros/zy';

zy.now; //-> 'Xg64Agb';
`${zy} line prefixed with timestamp`; //-> 'Xg64Agb line prefixed with timestamp'
zy.fromNanoseconds(1489747153_000000000n); //-> 'Xb3HAdD'
zy.toSeconds('Xb3HAdD'); //-> 1489747153
'Xb3HAdD' instanceof zy; //-> true
'started at 2010-10-14T04:58:49Z, ended at 2017-03-17T10:39:13Z successfully'.replace(zy);
  //-> 'started at XUAE4wn, ended at Xb3HAdD successfully'
```

Make sure that your environment is modern enough, works with ESM and has `Temporal` support. If not, provide a polyfill.

# Rationale

### Problem

Calendars are horrific due to astronomical reasons, and making a perfectly adjusted timing systems requires astronomical adjustments.

However, weird date and sexagenary time are widely accepted as something simple and normal by humans, while binary or denary systems are incomprehensible.

ISO 8601 is great overall, but sometimes it's too long, especially when it comes to logs and serialization.

| Format                              | Length | Comment                                                     |
|-------------------------------------|--------|-------------------------------------------------------------|
| `Fri Mar 17 2017 10:39:13 GMT+0000` |     33 | new Date().toString(), eww                                  |
| `2017-03-17T10:39:13Z`              |     20 | ISO 8601, longer if timezone is `+0000`                     |
| `20170317T103913`                   |     15 | ISO 8601, no dashes and hyphens                             |
| `1489747153`                        |     10 | Classic unix timestamp, humans can't parse it               |
| `58cbbcd1`                          |      8 | Timestamp as hex int32, even worse readability, Y2K38-prone |
| `0000000058cbbcd1`                  |     16 | Timestamp as hex int64, leading zeros, same readability     |
| `10:39:13`                          |      8 | Just time, limited usability, error-prone                   |


### Solution

| Format                              | Length | Comment                                                     |
|-------------------------------------|--------|-------------------------------------------------------------|
| `Xb3HAdD`                           |      7 | zy                                                          |

Looks like a random string at first glance, let's have a look at each character separately:

```yaml
Xb3HAdD
││││││└────: second, D == 13
│││││└─────: minute, d == 39
││││└──────: hour, A == 10
│││└───────: day, H == 17
││└────────: month, 3
├┼─────────: year, Xb = 2017
│└─────────: year of sexagenary century, b == 37
└──────────: sexagenary century, X == 33 and 60*33 == 1980
```

So, this format has 6 numbers made from 7 digits, concatenated together.

Numbers from 0 to 9 are represented as is (`0-9`), from 10 to 35 as uppercase latin letters (`A-Z`), from 36 to 59 as lowercase (`a-x`).

<details>
<summary>Complete table</summary>

| denary | zy-sexagenary |
|--------|---------------|
|  0     | 0             |
|  1     | 1             |
|  2     | 2             |
|  3     | 3             |
|  4     | 4             |
|  5     | 5             |
|  6     | 6             |
|  7     | 7             |
|  8     | 8             |
|  9     | 9             |
| 10     | A             |
| 11     | B             |
| 12     | C             |
| 13     | D             |
| 14     | E             |
| 15     | F             |
| 16     | G             |
| 17     | H             |
| 18     | I             |
| 19     | J             |
| 20     | K             |
| 21     | L             |
| 22     | M             |
| 23     | N             |
| 24     | O             |
| 25     | P             |
| 26     | Q             |
| 27     | R             |
| 28     | S             |
| 29     | T             |
| 30     | U             |
| 31     | V             |
| 32     | W             |
| 33     | X             |
| 34     | Y             |
| 35     | Z             |
| 36     | a             |
| 37     | b             |
| 38     | c             |
| 39     | d             |
| 40     | e             |
| 41     | f             |
| 42     | g             |
| 43     | h             |
| 44     | i             |
| 45     | j             |
| 46     | k             |
| 47     | l             |
| 48     | m             |
| 49     | n             |
| 50     | o             |
| 51     | p             |
| 52     | q             |
| 53     | r             |
| 54     | s             |
| 55     | t             |
| 56     | u             |
| 57     | v             |
| 58     | w             |
| 59     | x             |
</details>

### Further details

This character set is totes safe for any environment, as there's no symbols that require escaping or have special meaning.

This character order ensures that dates are correctly sortable (in ASCII table, digits are `0x30 ~ 0x39`, uppercase is `0x41 ~ 0x5a` and lowercase is `0x61 ~ 0x7a`).

Last two lowercase letters `y` and `z` are not needed to represent any digit (no leap seconds allowed), but any amount of `z` can be used as prefix, as well as any amount of `y` as suffix. This might help to explicitly mark it as datetime, since almost any 7-character alphanumeric string can be parsed as zy format.

`Xb3HAdD` == `Xb3HAdDyyy` == `zzzXb3HAdD` == `zXb3HAdDy`, etc.

To avoid realistically close problems similar to Y2K, year is represented as a two-digit number. Leading zero is not allowed, negative numbers are not allowed. Therefore, this format supports years from 60 to 3599. First digit works as sexagenary century: `X0 ~ Xx` means 1980-2039, `W` is for 1920-1979, `Y` are 2040-2099.

Timezones are not supported. The time is only in UTC. Timezones are ugly, unstable, inconvenient and not justified. The fact that even ISO 8601 representation is ambiguous without `Z` or `+0000` or `[UTC]` or whatever and can still be interpreted as "local time" is a disgrace.

# Documentation

WIP

# FAQ

WIP

# License

[GPL-3.0-or-later](https://github.com/LiviaMedeiros/zy/blob/master/LICENSE)
