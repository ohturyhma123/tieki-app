import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import linksData from '../data/linksData.json' assert { type: 'json' };

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/links', (req, res) => {
  res.json(linksData);
});

let linksData = linksData; // Use let instead of const

app.put('/api/links', (req, res) => {
  const updatedLinks = req.body;
  linksData = updatedLinks; // Update the links data on the server
  res.json(linksData);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
