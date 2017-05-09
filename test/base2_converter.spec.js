// I grant you that like most of my personal projects, this project needs
// more tests.

import { expect } from 'chai';
import b2 from '../src/js/base2_converter'; // TODO: fix path to just js/ and fix webpack

describe('base2_converter', () => {

  describe('encode', () => {

    it('encodes binary into base 64', () => {

      const none = b2.encode('0000'),
            one  = b2.encode('0001'),
            sixt = b2.encode('10000');

      expect(none).to.eq('0');
      expect(one).to.eq('1');
      expect(sixt).to.eq('g');

    });

  });

  describe('decode', () => {

    it('decodes base64 into binary', () => {

      const sixt = b2.decode('g'),
            one  = b2.decode('1'),
            none = b2.decode('0');

      expect(sixt).to.eq('10000');
      expect(one).to.eq('0001');
      expect(none).to.eq('0000');

    });

  });
});
