const express = require('express');
const { runAStar, runDijkstra } = require('../utils/algorithms');

const router = express.Router();

router.post('/run', (req, res) => {
    const { algorithm, grid, params, source, destination } = req.body;

    if (!grid || !algorithm || !source || !destination) {
        return res.status(400).json({ error: 'Grid, algorithm, source, and destination are required.' });
    }

    let results;
    switch (algorithm) {
        case 'A-Star':
            results = runAStar(grid, params, source, destination);
            break;
        case 'Dijkstra':
            results = runDijkstra(grid, source, destination);
            break;
        default:
            return res.status(400).json({ error: 'Unknown algorithm.' });
    }

    res.json(results);
});

module.exports = router;
