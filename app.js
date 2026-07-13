import express from 'express';
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

app.get('/contact', (req, res) => {
  res.send('Contact Us');
});

app.get('/student/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Welcome: ${name}`);
});

app.get('/multiply', (req, res) => {
    const { a, b } = req.query;
    if (!a || !b) {
        return res.status(400).send('Please provide both a and b query parameters.');
    }
    const product = Number(a) * Number(b);
    res.send(product.toString());
})
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});