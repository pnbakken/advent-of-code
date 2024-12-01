import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const SESSION_COOKIE = process.env.SESSION_COOKIE;

export default async function fetchUtil(year, day) {
  if (!SESSION_COOKIE) {
    throw new Error("SESSION_COOKIE is not defined");
  } else {
    try {
      const url = `https://adventofcode.com/${year}/day/${day}/input`;
      const response = await axios.get(url, {
        headers: {
          cookie: `session=${SESSION_COOKIE}`,
        },
      });

      console.log("Input fetched successfully!");
      console.log(response.data.trim());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
