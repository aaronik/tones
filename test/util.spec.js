import { expect } from 'chai';
import util from '../src/js/util'; // TODO fix path

describe('util', () => {

  describe('zeroTo', () => {

    it('returns an array of 0 up to the number specified', () => {

      expect(util.zeroTo(2)).to.deep.eq([0, 1]);

    });

  });

});
