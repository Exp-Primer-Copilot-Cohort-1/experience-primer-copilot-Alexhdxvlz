//Create web server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading comments' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    res.status(400).json({ message: 'Name and comment are required' });
  } else {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Error reading comments' });
      } else {
        const comments = JSON.parse(data);
        comments.push({ name, comment });
        fs.writeFile(commentsPath, JSON.stringify(comments), err => {
          if (err) {
            res.status(500).json({ message: 'Error writing comments' });
          } else {
            res.json({ message: 'Comment posted' });
          }
        });
      }
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));