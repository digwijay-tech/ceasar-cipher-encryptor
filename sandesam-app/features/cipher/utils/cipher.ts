const alphabets = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

/**
 * Encrypts a message using Caesar Cipher with a shift of -7 (or +19).
 * Preserves spaces and handles case-insensitivity.
 */
export function encryptMessage(userInput: string, shift = 7): string {
  const encryptedMessageArray: string[] = [];
  const splittedUserInput = userInput.toLowerCase().split("");

  for (let i = 0; i < splittedUserInput.length; i++) {
    const char = splittedUserInput[i];
    if (char === " " || !alphabets.includes(char)) {
      encryptedMessageArray.push(" ");
      continue;
    }
    const indexSplit = alphabets.indexOf(char);
    let indexEncrypt = indexSplit - shift;

    while (indexEncrypt < 0) {
      indexEncrypt = alphabets.length + indexEncrypt;
    }
    encryptedMessageArray.push(alphabets[indexEncrypt]);
  }

  return encryptedMessageArray.join("");
}

/**
 * Decrypts a message using Caesar Cipher with a shift of +7.
 * Preserves spaces and handles case-insensitivity.
 */
export function decryptMessage(encryptedMessage: string, shift = 7): string {
  const decryptedMessageArray: string[] = [];
  const splittedUserInput = encryptedMessage.toLowerCase().split("");

  for (let i = 0; i < splittedUserInput.length; i++) {
    const char = splittedUserInput[i];
    if (char === " " || !alphabets.includes(char)) {
      decryptedMessageArray.push(char);
      continue;
    }
    const indexSplit = alphabets.indexOf(char);
    let indexOfDecrypt = indexSplit + shift;

    while (indexOfDecrypt >= alphabets.length) {
      indexOfDecrypt = indexOfDecrypt - alphabets.length;
    }
    decryptedMessageArray.push(alphabets[indexOfDecrypt]);
  }

  return decryptedMessageArray.join("");
}

/**
 * Generates a random 4-letter alphabetic secret code.
 */
export function generateSecretCode(): string {
  let code = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * alphabets.length);
    code += alphabets[randomIndex];
  }
  return code;
}

