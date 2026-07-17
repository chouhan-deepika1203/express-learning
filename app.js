import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import {logger} from './middleware/logger.js';
import {requestCounter} from './middleware/requestCounter.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(requestCounter); // global request counter middleware for all routes
app.use(logger); // global logger middleware for all routes

app.use('/users', userRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});