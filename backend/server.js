// const express = require("express");
// const cors = require("cors");
// const pathfinder = require("./algorithms/pathfinder");
// const mazeRouting = require("./algorithms/mazeRouting");

// const {aStar, dijkstra} = require("./algorithms/algo");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Endpoint for routing
// app.post("/route", (req, res) => {
//     const { algorithm, grid, source, destination } = req.body;
  
//     // Validate input
//     if (!grid || !Array.isArray(grid) || grid.length === 0) {
//       console.error("Invalid or missing grid:", grid);
//       return res.status(400).json({ error: "Invalid or missing grid" });
//     }
//     if (!source || source.x === undefined || source.y === undefined) {
//       console.error("Invalid or missing source:", source);
//       return res.status(400).json({ error: "Invalid or missing source" });
//     }
//     if (!destination || destination.x === undefined || destination.y === undefined) {
//       console.error("Invalid or missing destination:", destination);
//       return res.status(400).json({ error: "Invalid or missing destination" });
//     }
  
//     console.log("Received Input:", { algorithm, grid, source, destination });
//     console.log(algorithm);
//     let path;
//     if (algorithm === "a-star") {
//       path = aStar(grid, source, destination);
//       // console.log(path);
//     } else if (algorithm === "d") {
//       path = dijkstra(grid, source, destination);
//     } else {
//       console.error("Invalid algorithm selected:", algorithm);
//       return res.status(400).json({ error: "Invalid algorithm selected" });
//     }

//     path = path.map((el) => {
//       return {x : el[0], y : el[1]};
//     })
//     console.log(path);
//     res.json({ path });
//   });
  

// // Start the server
// app.listen(5000, () => console.log("Backend server running on http://localhost:5000"));





const express = require("express");
const cors = require("cors");
const { aStar, dijkstra } = require("./algorithms/algo");

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint for routing
app.post("/route", (req, res) => {
  const { algorithm, grid, source, destination } = req.body;

  // Validate input
  if (!grid || !Array.isArray(grid) || grid.length === 0) {
    return res.status(400).json({ error: "Invalid or missing grid" });
  }
  if (!source || source.x === undefined || source.y === undefined) {
    return res.status(400).json({ error: "Invalid or missing source" });
  }
  if (!destination || destination.x === undefined || destination.y === undefined) {
    return res.status(400).json({ error: "Invalid or missing destination" });
  }

  console.log("Received Input:", { algorithm, grid, source, destination });

  let path = [];
  let runtime = 0;

  if (algorithm === "a-star") {
    const start = Date.now(); // Start time tracking for A*
    path = aStar(grid, source, destination);
    runtime = Date.now() - start; // Calculate runtime
  } else if (algorithm === "d") {
    const start = Date.now(); // Start time tracking for Dijkstra
    path = dijkstra(grid, source, destination);
    runtime = Date.now() - start; // Calculate runtime
  } else {
    return res.status(400).json({ error: "Invalid algorithm selected" });
  }

  const pathLength = path.length;

  // Format the path for the frontend
  const formattedPath = path.map((el) => ({ x: el[0], y: el[1] }));

  res.json({ path: formattedPath, runtime, pathLength });
});

// Start the server
app.listen(5000, () => console.log("Backend server running on http://localhost:5000"));
