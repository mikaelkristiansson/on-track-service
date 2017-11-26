import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from 'config';
import exercise from './app/routers/exercises';

// Connect to MongoDB
mongoose.createConnection(`mongodb://localhost/${config.mongodb.db}`);

// Initialize http server
const app = express();

// Logger that outputs all requests into the console
app.use(morgan('combined'));
// Use v1 as prefix for all API endpoints
app.use('/v1', exercise);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
