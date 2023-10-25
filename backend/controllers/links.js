import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import linksData from '../../data/linksData.json' assert { type: 'json' }

const app = express();

app.use(cors());

app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>');
// });

app.get('/', (req, res) => {
  res.json(linksData);
});


// PUT endpoint to update links
app.put('/', (req, res) => {
  const updatedLinks = req.body;

  // Assuming linksData is an array of objects with an 'id' property
  updatedLinks.forEach((updatedLink) => {
    const index = linksData.findIndex((link) => link.id === updatedLink.id);
    if (index !== -1) {
      // Update the existing link with new data
      linksData[index] = { ...linksData[index], ...updatedLink };
    }
  });

  res.json({ message: 'Links updated successfully' });
});

export default app;