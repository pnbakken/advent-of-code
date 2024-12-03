import fetchUtil from "../../util/fetchUtil.js";

(async function solve() {
  const YEAR = 2024;
  const DAY = 3;
  let sum = 0;

  const commands = /do\(\)|don't\(\)|mul\(\d+,\d+\)/g;
  let enabled = true;

  try {
    const rawData = await fetchUtil(YEAR, DAY);
    console.log(rawData);
    if (rawData) {
      const matches = rawData.match(commands);
      console.log(matches);

      if (matches) {
        matches.forEach(function (match, i) {
          if (match === "do()") {
            enabled = true;
          } else if (match === "don't()") {
            enabled = false;
          } else if (enabled && match.startsWith("mul")) {
            const a = match.split("(")[1].split(",")[0];
            const b = match.split(")")[0].split(",")[1];
            console.log("AAAAA:::::", a);
            console.log("BBBBB:::::", b);
            console.log("_____________________");

            const product = Number(a) * Number(b);
            console.log(product);
            sum += product;
          }
        });
      }
    }

    console.log("Sum is ", sum);
  } catch (error) {
    console.log(error);
  }
})();
