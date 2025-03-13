const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let books = [];

// Default Route - Serves the form
app.get('/', (req, res) => {
    res.render('index');
});

// Summary Route - Displays submitted books
app.get('/summary', (req, res) => {
    res.render('summary', { books });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { title, comment, rating } = req.body;
    if (!title || !rating) {
        return res.send("<p>Title and Rating are required. <a href='/'>Go back</a></p>");
    }
    books.push({ title, comment, rating });
    res.redirect('/summary');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
