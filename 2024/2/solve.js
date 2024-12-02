import fetchUtil from "../../util/fetchUtil.js";

(async function solve() {
  const YEAR = 2024;
  const DAY = 2;
  let sum = 0;

  try {
    const rawData = await fetchUtil(YEAR, DAY);
    console.log(rawData);

    rawData.split("\n").forEach((line) => {
      if (line) {
        const numbers = line.split(" ").map(Number); // Parse line into numbers

        // Generate subsets
        const subsets = numbers.map((_, index) =>
          numbers.filter((_, i) => i !== index)
        );

        // Check if the set is safe
        let safe = checkIfSetSafe(numbers);

        // If not safe, check subsets
        if (!safe) {
          safe = subsets.some((subset) => checkIfSetSafe(subset));
        }

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
  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < set.length; i++) {
    const diff = set[i] - set[i - 1];

    // Check adjacent difference constraint
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false; // Immediately unsafe if any diff is out of range
    }

    // Track if the sequence is consistently increasing or decreasing
    if (diff > 0) {
      decreasing = false; // Not decreasing if there's an increase
    } else if (diff < 0) {
      increasing = false; // Not increasing if there's a decrease
    }
  }

  return increasing || decreasing;
}
