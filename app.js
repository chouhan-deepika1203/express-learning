import express from 'express';
const app = express();
const PORT = 3000;

import userRoutes from './routes/userRoutes.js';

app.use(express.json());
app.use('/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});