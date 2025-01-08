const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Allow CORS for all origins (make sure your API is accessible from your phone)
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/names")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Define the schema and model for names
const nameSchema = new mongoose.Schema(
  {
    name: String,
    meaning: String,
    frequency: Number,
  },
  { collection: "listofnames" }
);

const Name = mongoose.model("Name", nameSchema);

// API to search for a name
app.get("/name/:name", async (req, res) => {
  const userName = req.params.name.toLowerCase(); // Make search case-insensitive

  try {
    const result = await Name.findOne({ name: userName });
    if (result) {
      const rarity = ((1 - result.frequency / 200000) * 100).toFixed(2);
      res.json({
        name: result.name,
        meaning: result.meaning,
        frequency: result.frequency,
        rarity: `${rarity}%`,
      });
    } else {
      res.json({ message: "Name not found" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
