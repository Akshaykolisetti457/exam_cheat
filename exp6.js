const express = require('express');
const app = express();
const port = 3000;
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
]

//get all users
app.get("/api/users", (req, res) => {
    res.jsonp(users);
});
//get specific user
app.get('/api/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.jsonp(user);
});
//post new user
app.post('/api/users', (req, res) => {
    const newerUser = {
        id: 3,
        name: "Alice Johnson",
    };
    users.push(newerUser);
    res.json({ message: 'User added successfully' });
});

//put user
app.put('/api/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: ' user not found' });
    user.name = req.body.name;
    res.json({ message: 'User updated successfully' });
});
//delete user
app.delete('/api/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    res.json({ message: 'User deleted successfully' });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));