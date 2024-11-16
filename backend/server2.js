const express = require('express');
const cors = require('cors');
const algorithmRoutes = require('./routes/algorithms');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', algorithmRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
