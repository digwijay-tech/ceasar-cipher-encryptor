const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let encryptedMessage = "";
let decryptedMessage = "";
const userInput = "pravana anil";

function encryptMessage() {
  const encryptedMessageArray = [];
  const splitedUserInput = userInput.split("");
  for (ui = 0; ui < splitedUserInput.length; ui++) {
    // console.log(splitedUserInput[ui]);
    if (splitedUserInput[ui] === " ") {
      encryptedMessageArray.push(splitedUserInput[ui]);
      continue;
    }
    let indexSplit = alphabets.indexOf(splitedUserInput[ui]);
    // console.log(indexSplit);
    let indexEncrypt = indexSplit - 7;

    if (indexEncrypt <= -1) {
      indexEncrypt = alphabets.length + indexEncrypt;
    }
    // console.log(indexEncrypt);
    encryptedMessageArray.push(alphabets[indexEncrypt]);
  }
  encryptedMessage = encryptedMessageArray.join("");
  console.log(encryptedMessage);
}

function decryptMessage() {
  const decryptedMessageArray = [];
  const splitedUserInput = encryptedMessage.split("");
  for (i = 0; i <splitedUserInput.length; i++) {

    let indexOfDecrypt = (alphabets.indexOf(splitedUserInput[i])) + 7;
    // console.log(indexOfDecrypt);
    
    if (splitedUserInput[i] === " ") {
      decryptedMessageArray.push(splitedUserInput[i]);
      continue;
    }
    // console.log(splitedUserInput[i]);

    if (indexOfDecrypt >= alphabets.length) {
      indexOfDecrypt = indexOfDecrypt - alphabets.length;
    }
    //  console.log(indexOfDecrypt);
    decryptedMessageArray.push(alphabets[indexOfDecrypt]);
  }
  decryptedMessage = decryptedMessageArray.join("");
  console.log(decryptedMessage);
}

encryptMessage();
decryptMessage();
