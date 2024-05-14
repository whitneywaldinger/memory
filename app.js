/**
 * section starter files
 */

'use strict';

const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs').promises;

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Route to handle the image generation request
app.get('/generate', async (req, res) => {
    try {
      let mems = await fs.readFile('memories.json', 'utf8');
      res.type('json').json(mems);
    } catch (error) {
      res.status(500).type('text').send('error!!');
    }
});

const PORT = process.env.PORT || 8000
app.listen(PORT);