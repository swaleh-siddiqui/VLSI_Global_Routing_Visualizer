const express = require("express");
const cors = require("cors");
const pathfinder = require("./algorithms/pathfinder");
const mazeRouting = require("./algorithms/mazeRouting");

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint for routing
app.post("/route", (req, res) => {
    const { algorithm, grid, source, destination } = req.body;
  
    // Validate input
    if (!grid || !Array.isArray(grid) || grid.length === 0) {
      console.error("Invalid or missing grid:", grid);
      return res.status(400).json({ error: "Invalid or missing grid" });
    }
    if (!source || source.x === undefined || source.y === undefined) {
      console.error("Invalid or missing source:", source);
      return res.status(400).json({ error: "Invalid or missing source" });
    }
    if (!destination || destination.x === undefined || destination.y === undefined) {
      console.error("Invalid or missing destination:", destination);
      return res.status(400).json({ error: "Invalid or missing destination" });
    }
  
    console.log("Received Input:", { algorithm, grid, source, destination });
  
    let path;
    if (algorithm === "pathfinder") {
      path = pathfinder(grid, source, destination);
    } else if (algorithm === "maze") {
      path = mazeRouting(grid, source, destination);
    } else {
      console.error("Invalid algorithm selected:", algorithm);
      return res.status(400).json({ error: "Invalid algorithm selected" });
    }
  
    res.json({ path });
  });
  

// Start the server
app.listen(5000, () => console.log("Backend server running on http://localhost:5000"));
