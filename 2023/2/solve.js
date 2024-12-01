import fetchUtil from "../../util/fetchUtil.js";

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

(async function solve() {
  const YEAR = 2023;
  const DAY = 2;
  let sum = 0;
  let sumOfPower = 0;
  try {
    const rawData = await fetchUtil(YEAR, DAY);

    if (rawData) {
      rawData.split("\n").forEach(function (line, i) {
        if (line) {
          const GAMEID = Number(line.split(":")[0].split(" ")[1]);
          let gamePossible = true;
          const results = line.split(":")[1];

          let minRed = 0;
          let minGreen = 0;
          let minBlue = 0;

          if (results) {
            results.split(";").forEach(function (result) {
              if (result) {
                result.split(",").forEach(function (c) {
                  const [score, colour] = c.trim().split(" ");

                  if (colour === "red") {
                    if (Number(score) > MAX_RED) {
                      gamePossible = false;
                    }
                    if (Number(score) > minRed) {
                      minRed = Number(score);
                    }
                  } else if (colour === "green") {
                    if (Number(score) > MAX_GREEN) {
                      gamePossible = false;
                    }
                    if (Number(score) > minGreen) {
                      minGreen = Number(score);
                    }
                  } else if (colour === "blue") {
                    if (Number(score) > MAX_BLUE) {
                      gamePossible = false;
                    }
                    if (Number(score) > minBlue) {
                      minBlue = Number(score);
                    }
                  }

                  console.log(colour + " " + score, gamePossible);
                });
              }
            });
          }

          if (gamePossible) {
            sum += GAMEID;
          }

          sumOfPower += minRed * minGreen * minBlue;
        }
      });

      console.log("Sum possible games: ", sum);
      console.log("Sum of power: ", sumOfPower);
    }
  } catch (error) {
    console.log(error);
  }
})();
