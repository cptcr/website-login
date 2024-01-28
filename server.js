const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { UserModel } = require('./models/User');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(``);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register', 'index.html'))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'))
});

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).sendFile(path.join(__dirname, 'public', 'auth', 'error.html'));
    }

    try {
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).sendFile(path.join(__dirname, 'public', 'auth', 'error.html'));
        }

        const newUser = new UserModel({ username, password, email });
        await newUser.save();
        res.status(201).sendFile(path.join(__dirname, 'public', 'success', 'accountCreate.html'));
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).sendFile(path.join(__dirname, 'public', 'auth', 'error.html'));
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;



    try {
        const user = await UserModel.findOne({ username: username, password: password });
        if (!user) {
            return res.status(401).sendFile(path.join(__dirname, 'public', 'auth', 'error.html'));
        }

        res.status(200).sendFile(path.join(__dirname, 'public', 'success', 'loginSuccess.html'));
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).sendFile(path.join(__dirname, 'public', 'auth', 'error.html'));
    }
});


//app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });

app.listen(3049, '217.160.202.199', function () {
    console.log('App is listening on this servers IP Adress!')
})