/**
 * section starter files
 */

"use strict";

const express = require("express");
const app = express();
const fs = require('fs');

const multer = require("multer");

// Read the memories.json file
const imagesData = JSON.parse(fs.readFileSync('memories.json'));

// Route to handle the image upload request
app.get('/upload', (req, res) => {
  try {
    // Generate a random index to select a random image from the imagesData array
    const randomIndex = Math.floor(Math.random() * imagesData.length);
    const randomImage = imagesData[randomIndex];

    // Simulate server processing delay
    setTimeout(() => {
      res.json({ 'img-name': randomImage['img-name'] });
    }, 1000); // Adjust the delay as needed
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate random image' });
  }
});

// Serve static images from the 'images' directory
app.use('/images', express.static('images'));

const PORT = process.env.PORT || 8000;
app.listen(PORT);
