import { expect } from 'chai';
import b2 from '../src/js/base2_converter'; // TODO: fix path to just js/ and fix webpack

describe('base2_converter', () => {

  describe('encode', () => {

    it('encodes binary into base 64', () => {
      [0..1
      const none = b2.encode('0000');
      const one  = b2.encode('0001');
      const sixt = b2.encode('10000');
      expect(none).to.eq('0');
      expect(one).to.eq('1');
      expect(sixt).to.eq('g');
    });
  });
});
