// Create web server
// Create API to get comments
// Create API to post comments
// Create API to delete comments
// Create API to update comments

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuid = require('uuid');

// Create web server
const app = express();
app.use(bodyParser.json());

// Create API to get comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        res.send(data);
    });
});

// Create API to post comments
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Something went wrong');
                return;
            }
            res.send('Comment added');
        });
    });
});

// Create API to delete comments
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        const comments = JSON.parse(data);
        const newComments = comments.filter(comment => comment.id !== id);
        fs.writeFile('./comments.json', JSON.stringify(newComments), (err) => {
            if (err) {
                res.status(500).send('Something went wrong');
                return;
            }
            res.send('Comment deleted');
        });
    });
});

// Create API to update comments
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
        if (err) {
            res.status(500).send('Something went wrong');
            return;
        }
        const comments = JSON.parse(data);
        const newComments = comments.map(comment => {
            return {
                id: uuid.v4(),
                ...comment
            };
        });
        const newComments = comments.map(comment => {

