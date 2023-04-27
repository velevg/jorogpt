const PORT = 8000;
const express = require("express");
const cors = require("cors"); //рестриктва access към API от други
require("dotenv").config();
// Create Express app
const app = express();
// Use middleware
app.use(express.json()); //so i can pass json from the frontend to the backend (talkin'bout dat value yo)
app.use(cors());

// Get API_KEY from environment variable
const API_KEY = process.env.API_KEY;

// Define route for handling completion requests
app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 4048,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json(); //json is another async method
    res.send(data); // and then sends it
  } catch (error) {
    ("");
    //console.log(error)
  }
});

// Start server
app.listen(PORT, () => console.log("Server is running on PORT " + PORT));
