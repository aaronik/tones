
// the characters we'll use to represent the various symbols of our base system.
const RADIX_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

// TODO
// * converge on chunk or byte
// * converge on taking chunk size and hard coding it
// * rename from base2_converter?

// base2_converter
// encode a string of binary to a base64, url safe
// compressed string. Saves room on the URL bar,
// no longer have giant 1's and 0's urls.
//

function base10ToBinary (num, chunkSize = 6) {
  // convert to binary
  let binStr = (num).toString(2);

  // The num must be the right length for this application,
  // as a zero at the beginning of the byte is necessary
  // information. So we pad the beginning of string with zeroes.
  while (binStr.length < chunkSize) {
    binStr = '0' + binStr;
  }

  return binStr;
}

function binaryToChunks (binary) {
  let binaryDup = binary.slice();
  let remainingLength = binaryDup.length;

  let chunks = []
  for (let seg = 0; remainingLength > 0; seg++) {
    let first = seg * 6;
    let last = first + 6;
    chunks.push(binaryDup.slice(first, last));
    remainingLength -= 6;
  }

  return chunks;
}

// it'd be great if we could operate solely in base 64 and base 2, but
// javascript is written in base 10. You can't get index 'a' of an array.
function chunkToBase10 (byte) {
  return parseInt(byte, 2);
}

// Encode a string of binary into a base 64 string.
// Split binary into "chunks", bytes, then turn each
// into a single base64 character. Mush them all together
// and there you have it.
function encode (binary) {
  let chunks = binaryToChunks(binary);
  let charIndices = chunks.map(chunkToBase10);
  let chars = charIndices.map((idx) => {return RADIX_CHARS[idx]});
  return chars.join('');
}

// Turn base64 string back into binary.
// string b64String   : the string (base 64 number) to be converted to base 2
// num    totalNumBits: the total number of bits for the string when converted to base 2
function decode (b64String, totalNumBits = 256) {
  const basedNumArr = b64String.split('');

  let basedNumIdxArr = basedNumArr.map( char => {
    return RADIX_CHARS.indexOf(char);
  });

  return basedNumIdxArr.map( (num, idx) => {
    if (idx == (b64String.length - 1)) { // last num (handle 6 bit roundoff issue)
      // if totalNumBits % 6 == 0, we're really on the last bit and we want 6
      return base10ToBinary(num, (totalNumBits % 6) || 6);
    } else {
      return base10ToBinary(num, 6)
    }
  }).join('');
}

export default { encode, decode };
