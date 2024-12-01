import fetchUtil from "../../util/fetchUtil.js";

const alphaDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

async function solve() {
  const YEAR = 2023;
  const DAY = 1;
  let sum = 0;
  try {
    const rawData = await fetchUtil(YEAR, DAY);

    if (rawData) {
      rawData.split("\n").forEach(function (line, i) {
        if (line) {
          let firstDigit;
          let secondDigit;
          line.split("").forEach(function (c, j) {
            const alphaNumber = checkIfAlphaNumber(line, j);
            if (!isNaN(c) && c !== "") {
              if (!firstDigit) {
                firstDigit = c;
              } else {
                secondDigit = c;
              }
            } else if (alphaNumber) {
              if (!firstDigit) {
                firstDigit = alphaNumber;
              } else {
                secondDigit = alphaNumber;
              }
            }
          });

          if (firstDigit && secondDigit) {
            sum += Number("" + firstDigit + secondDigit);
          } else if (firstDigit) {
            sum += Number("" + firstDigit + firstDigit);
          }
        }
      });

      console.log(sum);
    }
  } catch (error) {
    console.log(error);
  }
}

solve();

function checkIfAlphaNumber(line, index) {
  const charSet = [];
  for (let i = index; i < line.length; i++) {
    charSet.push(line.charAt(i));
    const match = alphaDigits.find((a) => a === charSet.join(""));
    if (match) {
      return alphaDigits.indexOf(match) + 1;
    }
  }
}
