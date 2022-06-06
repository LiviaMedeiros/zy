#!/usr/bin/env node
import { zy } from '../src/zy.mjs';

const print = process.stdout.isTTY
  ? console.log.bind(console)
  : process.stdout.write.bind(process.stdout);
const [,,z,y] = process.argv;
const help = `Usage: zy [d | -d | --decode | e | -e | --encode] [string]

Encodes datetime string into zy format or decodes to ISO 8601.

If string is not provided, current time is used.

Example:
  zy
  zy -d
  zy d Xb3HAdDy
  zy --encode 2017-03-17T10:39:13Z`;

try {
  switch (`${z}`.replace(/^-*/,'')) {
    case 'undefined':
      print(zy.now);
      break;
    case 'h':
    case 'help':
      print(help);
      break;
    case 'd':
    case 'dec':
    case 'decode':
      print(zy.toISO(y));
      break;
    case 'e':
    case 'enc':
    case 'encode':
      print(zy.fromString(y));
      break;
    default:
      try {
        print(zy.toISO(z));
      } catch {
        print(zy.fromString(z));
      }
  }
} catch (e) {
  process.stderr.write(`${help}\n\n`);
  throw e;
}