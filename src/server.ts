import './loadEnvironment';
import express from 'express';
import apiRouter from './api/index';

// Initialize express
const app = express();
const port = process.env.HOST_PORT ?? '3000';

app.get('/ping', (req, res) => res.send('pong'));

app.use('/api/v1', apiRouter);

app.listen(process.env.HOST_PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
