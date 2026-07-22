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
const encryptedMessage = [];
const userInput = "i was a don";
const splitedUserInput = userInput.split("");
function ceasarCipher() {
  for (ui = 0; ui < splitedUserInput.length; ui++) {
    // console.log(splitedUserInput[ui]);
    if (splitedUserInput[ui] === " ") continue;
    let indexSplit = alphabets.indexOf(splitedUserInput[ui]);
    // console.log(indexSplit);
    let indexEncrypt = indexSplit - 7;

    if (indexEncrypt <= -1) {
      indexEncrypt = alphabets.length + indexEncrypt;
    }
    console.log(indexEncrypt);
    encryptedMessage.push(alphabets[indexEncrypt]);
  }
  console.log(encryptedMessage.join(""));

}

ceasarCipher();
