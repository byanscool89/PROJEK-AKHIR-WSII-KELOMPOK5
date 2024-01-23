const express = require('express');
const path = require('path');
const app = express();
const port = 3333;

const bodyParser = require('body-parser');

// Gunakan middleware body-parser untuk mengurai body permintaan
app.use(bodyParser.json());

const router = require('./routes/index');

// Gunakan router
app.use(router);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({message: "hallo ini pake json"})
    // res.send("Hello, ini express yaaak!");
});

// app.get('/users/:id', (req, res) => {
//     console.log(req.params)
//     const {id} = req.params
//     res.send(`Ini merupakan user dengan ID ${req.params.id}`);
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
