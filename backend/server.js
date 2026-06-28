import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Sample dataset
let reviews = [
    { id: 1, guest: "Alice M.", sentiment: "positive", theme: "cleanliness", comment: "The room was absolutely spotless! Incredible attention to detail." },
    { id: 2, guest: "John D.", sentiment: "negative", theme: "food", comment: "Breakfast was cold and took 40 minutes to arrive. Disappointed." }
];

// Core GET Endpoint
app.get('/api/reviews', (req, res) => {
    res.status(200).json(reviews);
});

// Start listening and hold the terminal process awake
app.listen(PORT, () => {
    console.log(`🚀 Basic backend server running on http://localhost:${PORT}`);
});