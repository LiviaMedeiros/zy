/*! zy: short alphanumeric datetime format © Xg***** LiviaMedeiros */

export class zy {
  static#TZ = new Temporal.TimeZone('UTC');
  static#BASE = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx';
  static#CHARS = this.#BASE.split('');
  static#NUMS = Object.fromEntries(this.#CHARS.map((z,y)=>[z,y]));
  static#RS_ZY = 'z*(?<year>__)(?<month>_)(?<day>_)(?<hour>_)(?<minute>_)(?<second>_)y*'.replaceAll('_',`[${this.#BASE}]`);
  static#RE_ZY = new RegExp(`^${this.#RS_ZY}$`);
  static#RS_ISO = '(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2})(?:\\.\\d*)?(?:[+-]\\d{4}|Z)';
  static#RE_ISO_PARSE = new RegExp(`^${this.#RS_ISO}?$`);
  static#RE_ISO_REPLACE = new RegExp(this.#RS_ISO, 'g');
  static#INSTANCE = Object.freeze({ __proto__: null, [Symbol.toPrimitive]:this.#returnNow.bind(this)});
  static#MIN_string = '0060-01-01T00:00:00.000000000+0000';
  static#MAX_string = '3599-12-31T23:59:59.999999999+0000';
  static#MIN_Instant = Temporal.Instant.from(this.#MIN_string);
  static#MAX_Instant = Temporal.Instant.from(this.#MAX_string);
  static#MIN_Date = new Date(this.#MIN_string);
  static#MAX_Date = new Date(this.#MAX_string);
  static#MIN_bigint = this.#MIN_Instant.epochMicroseconds;
  static#MAX_bigint = this.#MAX_Instant.epochMicroseconds;
  static#MIN_number = this.#MIN_Instant.epochSeconds;
  static#MAX_number = this.#MAX_Instant.epochSeconds;
  static#START_Instant = Temporal.Now.instant();

  static MIN = this.#fromInstant(this.#MIN_Instant);
  static MAX = this.#fromInstant(this.#MAX_Instant);
  static START = this.#fromInstant(this.#START_Instant);

  static#fromZonedDateTime($ = Temporal.Now.zonedDateTimeISO(this.#TZ)) {
    return ['second','minute','hour','day','month','year'].reduce((z,y)=>{y=$[y];
      do z=this.#CHARS[y%60]+z;while(y=0|y/60);return z;},'');
  }
  static fromZonedDateTime($ = Temporal.Now.zonedDateTimeISO(this.#TZ)) {
    return this.#fromZonedDateTime(this.#validZonedDateTimeInstance($));
  }
  static#fromDate($ = new Date) {
    return ['Seconds','Minutes','Hours','Date','Month','FullYear'].reduce((z,y)=>{y=(y==='Month')+$['getUTC'+y]();
      do z=this.#CHARS[y%60]+z;while(y=0|y/60);return z;},'');
  }
  static fromDate($ = new Date) {
    return this.#fromDate(this.validDate($));
  }
  static#parseISO($ = String(Temporal.Now.instant())) {
    if ($ = this.#RE_ISO_PARSE.exec($)) return $;
    throw new TypeError('Invalid ISO 8601 Date');
  }
  static fromISO($ = String(Temporal.Now.instant())) {
    return this.#parseISO($).splice(1).reduceRight((z,y)=>{
      do z=this.#CHARS[y%60]+z;while(y=0|y/60);return z;},'');
  }

  static#validInstantRange($) {
    if (Temporal.Instant.compare(this.#MIN_Instant, $) <= 0
     && Temporal.Instant.compare(this.#MAX_Instant, $) >= 0
    ) return $;
    throw new RangeError('Invalid Instant Range');
  }
  static#validInstantInstance($) {
    if ($ instanceof Temporal.Instant) return $;
    throw new TypeError('Invalid Instant Instance');
  }
  static validInstant($) {
    return this.#validInstantRange(this.#validInstantInstance($));
  }
  static#validZonedDateTimeInstance($) {
    if ($ instanceof Temporal.ZonedDateTime) return $;
    throw new TypeError('Invalid ZonedDateTime Instance');
  }
  static#validDateInstance($) {
    if ($ instanceof Date) return $;
    throw new TypeError('Invalid Date Instance');
  }
  static#validDateRange($) {
    if (this.#MIN_Date <=$&&$<= this.#MAX_Date) return $;
    throw new RangeError('Invalid Date Range');
  }
  static validDate($) {
    return this.#validDateRange(this.#validDateInstance($));
  }

  static#splitZY($) {
    if ($ = this.#RE_ZY.exec($)) return $;
    throw new TypeError('Invalid Zy');
  }

  static#fromInstant($) {
    return this.fromZonedDateTime(this.#validInstantRange($).toZonedDateTimeISO(this.#TZ));
  }
  static fromInstant($ = Temporal.Now.instant()) {
    return this.#fromInstant(this.#validInstantInstance($));
  }

  static fromString($ = String(Temporal.Now.instant())) {
    return this.#fromInstant(Temporal.Instant.from(String($)));
  }

  static fromSeconds($ = Temporal.Now.instant().epochSeconds) {
    return this.#fromInstant(Temporal.Instant.fromEpochSeconds(Number($)));
  }
  static fromMilliseconds($ = Temporal.Now.instant().epochMilliseconds) {
    return this.#fromInstant(Temporal.Instant.fromEpochMilliseconds(Number($)));
  }
  static fromMicroseconds($ = Temporal.Now.instant().epochMicroseconds) {
    return this.#fromInstant(Temporal.Instant.fromEpochMicroseconds(BigInt($)));
  }
  static fromNanoseconds($ = Temporal.Now.instant().epochNanoseconds) {
    return this.#fromInstant(new Temporal.Instant(BigInt($)));
  }

  static fromNumber($ = Temporal.Now.instant().epochMilliseconds) {
    return (this.#MIN_number <$&&$< this.#MAX_number ? this.fromSeconds : this.fromMilliseconds)($);
  }
  static fromBigInt($ = Temporal.Now.instant().epochNanoseconds) {
    return (this.#MIN_bigint <$&&$< this.#MAX_bigint ? this.fromMicroseconds : this.fromNanoseconds)($);
  }
  static fromInteger($ = Temporal.Now.instant().epochNanoseconds) {
    switch (typeof $) {
      case 'number': return this.fromNumber($);
      case 'bigint': return this.fromBigInt($);
      default: throw new TypeError('Invalid Integer');
    }
  }

  static from($) {
    switch (typeof $) {
      case 'number': return this.fromNumber($);
      case 'bigint': return this.fromBigInt($);
      case 'string': return this.fromString($);
      case 'object': switch (true) {
        case $ instanceof Temporal.ZonedDateTime: return this.fromZonedDateTime($);
        case $ instanceof Temporal.Instant: return this.fromInstant($);
        case $ instanceof Date: return this.fromDate($);
        default: throw new TypeError('Invalid Object');
      }
      default: throw new TypeError('Invalid Type');
    }
  }


  static#toZonedDateTime($ = this.#splitZY(this.#returnNow())) {
    return Temporal.ZonedDateTime.from({
      timeZone:this.#TZ,...Object.fromEntries(Object.entries($).map(
      ([z,y])=>[z,z==='year'?this.#NUMS[y[0]]*60+this.#NUMS[y[1]]:this.#NUMS[y]]))
    });
  }
  static toZonedDateTime($ = this.#returnNow()) {
    return this.#toZonedDateTime(this.#splitZY($).groups);
  }
  static toInstant($ = this.#returnNow()) {
    return this.toZonedDateTime($).toInstant();
  }
  static toISO($ = this.#returnNow()) {
    return this.toZonedDateTime($).toInstant().toString();
  }
  static toSeconds($ = this.#returnNow()) {
    return this.toZonedDateTime($).epochSeconds;
  }
  static toMilliseconds($ = this.#returnNow()) {
    return this.toZonedDateTime($).epochMilliseconds;
  }
  static toMicroseconds($ = this.#returnNow()) {
    return this.toZonedDateTime($).epochMicroseconds;
  }
  static toNanoseconds($ = this.#returnNow()) {
    return this.toZonedDateTime($).epochNanoseconds;
  }
  static toObject($ = this.#returnNow()) {
    return this.#splitZY($).groups;
  }


  static#returnNow() { return this.fromZonedDateTime(); }
  static*#generateNow() { while (true) yield this.#returnNow(); }

  static valueOf() {
    return NaN;
  }
  static toString = this.#returnNow;
  static toJSON = this.#returnNow;
  static [Symbol.toPrimitive] = this.#returnNow;
  static [Symbol.iterator] = this.#generateNow;
  static [Symbol.hasInstance]($) {
    try {
      return!! this.#splitZY($);
    } catch {
      return false;
    }
  }
  static [Symbol.replace]($) {
    return $.replace(this.#RE_ISO_REPLACE, $ => this.fromString($));
  }
  static [Symbol.match]($) {
    return $.match(this.#RE_ZY);
  }

  static get now() { return this.#returnNow(); }
  constructor() { return this.constructor.#INSTANCE; }
};
