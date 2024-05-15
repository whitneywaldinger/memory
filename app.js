/**
 * section starter files
 */

'use strict';

const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs').promises;

const upload = multer({ dest: 'public/images/' });
app.use(upload.any());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// returns a memory at random
app.get('/generate', async (req, res) => {
    try {
      let data = await fs.readFile('memories.json', 'utf8');
      data = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * data.length);
      res.type('json').json(data[randomIndex]);
    } catch (error) {
      res.status(500).type('text').send('error!!');
    }
});

app.post('/upload', async (req, res) => {
  let name = req.body.name;
  let title = req.body.title;
  let description = req.body.description;
  let photo = req.files[0];
  fs.rename(photo.path, photo.destination + photo.originalname);

  if (name && title && description && photo) {
    console.log("all of the inputs have been passed in");
    try {
      let mems = await fs.readFile("memories.json", "utf8");
      mems = JSON.parse(mems);
      console.log(mems);
      /* Add image */
      let newMemory = {
        "title": title,
         "name": name,
         "description": description,
         "img": photo.originalname
      };

      mems.push(newMemory);
      await fs.writeFile("memories.json", JSON.stringify(mems));
      res.type('text').send('Memory has been uploaded successfully!');
    } catch(err) {
      console.error(err);
      res.type('text').status(500).send('internal server error');
    }
  } else {
    res.type("text").status(400).send("Missing important information.");
  }
});

const PORT = process.env.PORT || 8000
app.listen(PORT);