/**
 *  Name: Whitney Waldinger
 *  Date: 5/2/2024
 *  Section: CSE 154 AC with Kathryn & Rasmus
 *
 *  This is the index.js file for my fourth create project.
 */

// http://localhost:8000/index.html
// http://localhost:8000

'use strict';

(function() {

  window.addEventListener("load", init);

  /**
   * Init Function
   */
  function init() {
    // add event listeners to each button
    id("gallery").addEventListener("click", memoryView);
    id("find").addEventListener("click", searchView);
    id("add").addEventListener("click", uploadView);
    id("upload-btn").addEventListener("click", uploadMemory);
    id("generate-btn").addEventListener("click", generateRandomImage);
  }

  /**
   * update memory view function
   */
  function memoryView() {
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
  async function uploadMemory() {
    // form data
    const name = id('name').value;
    const date = id('date').value;
    const description = id('description').value;
    const photo = id('photo').files[0];

    // check if all input is valid
    if (name && date && description && photo) {
      const params = new FormData();
      params.append('name', name);
      params.append('date', date);
      params.append('description', description);
      params.append('photo', photo);
    } else {
      // throw some message that highlights the empy cells red and
      // says that everything needs to be filled out
      console.log("error with form input");
    }

    // send form data to the server-side
    try {
      let res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: params
      });
      await statusCheck(res);
      let data = await res.json();
      addMemory(data);
      console.log("memory uploaded successfully");
    } catch(err) {
      console.error(err);
    }
  }

  function addMemory(data) {
    console.log(data);
  }

  async function generateRandomImage() {
    try {
      let res = await fetch('/generate');
      await statusCheck(res);
      let imgData = await res.json();
      console.log(imgData);
      /* let randomImage = id('random-image');
      randomImage.src = '/images/' + imgData['img-name']; */
    } catch (error) {
      console.error(error);
    }
  };

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