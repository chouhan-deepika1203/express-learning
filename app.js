import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/count', (req, res) => {
    res.json({ count: users.length });
});

app.get('/users/search', (req, res) => {
    const { name, age } = req.query;
    let filteredUsers = users;

    if (name) {
        filteredUsers = filteredUsers.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (age) {
        filteredUsers = filteredUsers.filter(u => u.age === parseInt(age));
    }

    res.json(filteredUsers);
});
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (!newUser.name || !newUser.age) {
        return res.status(400).json({ message: "Name and age are required" });
    }
    //name must be 3 characters long
    if (newUser.name.length < 3) {
        return res.status(400).json({ message: "Name must be at least 3 characters long" });
    }
    //age must be a number between 1 and 120
    if (typeof newUser.age !== 'number' || newUser.age < 1 || newUser.age > 120) {
        return res.status(400).json({ message: "Age must be a number between 1 and 120" });
    }
    newUser.id = users.length + 1; // Simple ID assignment
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser[0]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});