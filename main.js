const typeWriter = function (txtElement,words,wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait,10);
  this.type();
  this.isDeleting = false;
}

// Type Method
typeWriter.prototype.type = function () {
  // Current index of words
  const current = this.wordIndex % this.words.length;

  // Get full text of current word
  const fulltext = this.words[current];

  // Check if deleting
  if (this.isDeleting) {
    // Removing a character
    this.txt = fulltext.substring(0,this.txt.length - 1);
  }
  else {
    // Adding a character
    this.txt = fulltext.substring(0,this.txt.length + 1);
  }

  // Insert txt into Element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type Speed
  let typeSpeed = 200;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fulltext) {
    // Make pause at end
    typeSpeed = this.wait;

    // set isDeleting to true
    this.isDeleting = true;
  }
  else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;

    // Move to next word
    this.wordIndex++;

    // Pause before retyping
    typeSpeed = 500;
  }

  setTimeout(() => this.type(),typeSpeed);
};

// Init on DOM load
document.addEventListener('DOMContentLoaded',init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');

  // init typeWriter
  new typeWriter(txtElement,words,wait);
}
