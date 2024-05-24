const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/real-estate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const landSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  coordinates: [Number],
});

const Land = mongoose.model('Land', landSchema);

// Routes
app.get('/api/lands', async (req, res) => {
  const lands = await Land.find();
  res.json(lands);
});

app.post('/api/lands', async (req, res) => {
  const newLand = new Land(req.body);
  await newLand.save();
  res.json(newLand);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
