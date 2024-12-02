import fetchUtil from "../../util/fetchUtil.js";

(async function solve() {
  const YEAR = 2024;
  const DAY = 2;
  let sum = 0;

  try {
    const rawData = await fetchUtil(YEAR, DAY);
    console.log(rawData);

    rawData.split("\n").forEach(function (line, i) {
      if (line) {
        const chars = line.split(" ");

        let increase = false;
        let decrease = false;
        let safe = false;

        const numbers = [];

        chars.forEach(function (c, j) {
          numbers.push(Number(c));
        });

        console.log(numbers);

        const subsets = [];
        numbers.forEach(function (c, j) {
          subsets.push(
            numbers.filter(function (n, y) {
              return y !== j;
            })
          );
        });

        safe = checkIfSetSafe(numbers);
        console.log("Set is safe: ", safe);

        if (!safe) {
          subsets.every(function (s, j) {
            safe = checkIfSetSafe(s);
            if (safe) {
              return false;
            }
          });
        }

        console.log(`Sequence is ${safe ? "safe" : "NOT SAFE"}`);
        console.log("--------------------");

        if (safe) {
          sum += 1;
        }
      }
    });

    console.log("Total number of reports: ", rawData.split("\n").length);
    console.log("Sum of safe reports: ", sum);
  } catch (error) {
    console.log(error);
  }
})();

function checkIfSetSafe(set) {
  let increase = false;
  let decrease = false;
  let safeSet = false;

  set.every(function (c, j) {
    if (j === 0) {
      return true;
    } else {
      if (c === set[j - 1]) {
        safeSet = false;
        return false;
      }

      if (c > set[j - 1]) {
        if (decrease) {
          safeSet = false;
          return false;
        } else {
          increase = true;

          if (c - set[j - 1] <= 3) {
            safeSet = true;
            return true;
          } else {
            safeSet = false;
            return false;
          }
        }
      }
      if (c < set[j - 1]) {
        if (increase) {
          safeSet = false;
          return false;
        } else {
          decrease = true;

          if (set[j - 1] - c <= 3) {
            safeSet = true;
            return true;
          } else {
            safeSet = false;
            return false;
          }
        }
      }
    }
  });

  console.log(
    `Sequence is ${increase ? "increasing" : decrease ? "decreasing" : "NULL"}`
  );
  if (safeSet) {
    console.log("Safe set", set);
    return true;
  }
}
