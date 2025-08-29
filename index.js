import express from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "rachit_joshi";
const DOB = "29122002";
const EMAIL = "rachit.joshi2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BIT0544";

function alternatingCapsReverse(arr) {
  const alphabets = arr.join("");
  const reversed = alphabets.split("").reverse().join("");
  return reversed
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        // number
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // alphabets
        alphabets.push(item.toUpperCase());
      } else {
        // special characters
        special_characters.push(item);
      }
    });

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(alphabets),
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: error.message,
    });
  }
});

// default route
app.get("/", (req, res) => {
  res.send("API running. Use POST /bfhl");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
