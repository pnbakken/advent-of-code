import fetchUtil from "../../util/fetchUtil.js";

async function solve() {
  const YEAR = 2024;
  const DAY = 1;
  const list1 = [];
  const list2 = [];
  let sum = 0;
  let similarityScore = 0;

  try {
    const rawData = await fetchUtil(YEAR, DAY);
    console.log(rawData);

    if (rawData) {
      const lines = rawData.split("\n");
      for (let line of lines) {
        if (line) {
          const [num1, num2] = line.trim().split(/\s+/);
          list1.push(Number(num1));
          list2.push(Number(num2));
        }
      }

      if (
        list1.length > 0 &&
        list2.length > 0 &&
        list1.length === list2.length
      ) {
        list1.sort((a, b) => a - b);
        list2.sort((a, b) => a - b);

        for (let i = 0; i < list1.length; i++) {
          if (list1[i] > list2[i]) {
            let distance = list1[i] - list2[i];
            sum += distance;
          } else if (list2[i] > list1[i]) {
            let distance = list2[i] - list1[i];
            sum += distance;
          } else {
            sum += 0;
          }
        }

        console.log("Sum of distance = ", sum);

        // Part 2:

        // Find similarity score

        for (let num in list1) {
          const occurencesInSecondList = list2.filter(
            (item) => item === list1[num]
          );
          const score = list1[num] * occurencesInSecondList.length;
          similarityScore += score;
        }

        console.log("Similarity score = ", similarityScore);
      }
    }
  } catch (error) {
    console.log("Fetch failed");
    console.log(error);
  }
}

solve();
