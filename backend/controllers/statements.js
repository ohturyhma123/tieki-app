import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import statementsData from '../../data/statementsData.json' assert { type: 'json' };

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json(statementsData);
});

app.put('/', (req, res) => {
  try {
    const updatedStatements = req.body;
    updatedStatements.forEach((updatedStatement) => {
      const index = statementsData.findIndex((statement) => statement.id === updatedStatement.id);
      if (index !== -1) {
        statementsData[index] = { ...statementsData[index], ...updatedStatement };
      }
    });
    res.json({ message: 'Statements updated successfully', data: statementsData });
  } catch (error) {
    console.error('Error updating statements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;