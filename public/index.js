/**
 *  Name: Whitney Waldinger
 *  Date: 5/2/2024
 *  Section: CSE 154 AC with Kathryn & Rasmus
 *
 *  This is the index.js file for my fourth create project.
 */


'use strict';

(function() {

  window.addEventListener("load", init);

  /**
   * Init Function
   */
  async function init() {
    await generateRandomImage();
    // add event listeners to each button
    id("gallery").addEventListener("click", memoryView);
    id("find").addEventListener("click", searchView);
    id("add").addEventListener("click", uploadView);
    id("upload-btn").addEventListener("click", uploadMemory);
    id("generate-btn").addEventListener("click", generateRandomImage);
    qs('#search-bar button').addEventListener("click", searchMemories);
  }

  /**
   * update memory view function
   */
  async function memoryView() {
    id("gallery-view").classList.remove("hidden");
    id("search-view").classList.add("hidden");
    id("upload-view").classList.add("hidden");
  }

  /**
   * update search view function
   */
  function searchView() {
    id("gallery-view").classList.add("hidden");
    id("search-view").classList.remove("hidden");
    id("upload-view").classList.add("hidden");
  }

  /**
   * update upload view function
   */
  function uploadView() {
    id("gallery-view").classList.add("hidden");
    id("search-view").classList.add("hidden");
    id("upload-view").classList.remove("hidden");
  }

  /**
   * upload memory function
   */
  async function uploadMemory(event) {
    event.preventDefault(); // prevent from autmatically reloading
    // form data
    const name = id('name').value;
    const title = id('title').value;
    const description = id('description').value;
    const photo = id('photo').files[0];

    // check if all input is valid
    if (name && title && description && photo) {
      console.log("all inputs exist!");

      const params = new FormData();
      params.append('name', name);
      params.append('title', title);
      params.append('description', description);
      params.append('photo', photo);

      try {
        let res = await fetch('/upload', {
          method: 'POST',
          body: params
        });
        await statusCheck(res);
        let message = await res.text();
        console.log("message =" + message);
      } catch(err) {
        console.error("error with upload");
      }
    } else {
      // throw some message that highlights the empy cells red and
      // says that everything needs to be filled out
      console.log("error with upload");
    }
  }

  /**
   * generate random images
   */
  async function generateRandomImage() {
    try {
      let res = await fetch('/generate');
      await statusCheck(res);
      let imgData = await res.json();
      let randomImage = id('random-img');
      randomImage.src = './images/' + imgData.img;
    } catch (error) {
      console.error("error with generate");
    }
  };

  /**
   * search memories
   */
  async function searchMemories() {
    let query = new FormData();
    query.append('query', qs('#search-bar input').value);

    try {
      const res = await fetch('/search', {
        method: 'POST',
        body: query
      });
      await statusCheck(res);
      let data = await res.json();
      console.log("data = " + data);
      publishResults(data);
    } catch(err) {
      console.error(err);
    }
  }

  /**
   * displays all memory results
   * @param {*} data - memories containing the search words
   */
  function publishResults(data) {
    let memContainer = id('memory-container');
    memContainer.replaceChildren();
    data.forEach(memory => {
      let post = document.createElement('section');

      let title = document.createElement('h2');
      title.textContent = memory.title;
      post.appendChild(title);

      let description = document.createElement('p');
      description.textContent = memory.description;
      post.appendChild(description);

      let image = document.createElement('img');
      image.src = './images/' + memory.img;
      image.alt = "Image of " + memory.title;
      post.appendChild(image);

      post.classList.add('memory');

      memContainer.append(post);
    });
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Finds all of the elemnents in the document that have the given id.
   *
   * @param {String} id - desired id
   * @return {Element} element with the given id
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Finds the elemnent in the document that has the given tag.
   *
   * @param {String} tag - desired tag
   * @return {Element} element with the given tag
   */
  function qs(tag) {
    return document.querySelector(tag);
  }

})();