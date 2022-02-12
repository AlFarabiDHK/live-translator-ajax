/*
 Name:       Muhtasim Al-Farabi
Course:      CSc 337
File:        outline.js
Description: This program contains a function which uses AJAX request
            to change the content of the right textarea.
 */

/**
 * This function communicates with the server translator.js and sends
 * http requests when state on the left textarea changes.
 * @returns http request to translator.js
 */

function requestTranslation() {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      return false;
    }

    // runs if the state changes and makes changes to the right box

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          document.getElementById('right').innerText = httpRequest.responseText;
        } 
      }
    }

    // figuring out the translation type

    var translationType = "";
    if (document.getElementById("language-left").value == "english"){
        if (document.getElementById("language-right").value == "spanish")
            translationType = "e2s";
        else if (document.getElementById("language-right").value == "german")
            translationType = "e2g";
        else
            translationType = "e2e";
    }

    else if (document.getElementById("language-left").value == "spanish"){
        if (document.getElementById("language-right").value == "english")
            translationType = "s2e";
        else if (document.getElementById("language-right").value == "german")
            translationType = "s2g";
        else
            translationType = "s2s";
    }

    else if (document.getElementById("language-left").value == "german"){
        if (document.getElementById("language-right").value == "english")
            translationType = "g2e";
        else if (document.getElementById("language-right").value == "spanish")
            translationType = "g2s";
        else
            translationType = "g2g";
    }
    // preparing variables to concatinate into an url
    translate = "translate";
    content = document.getElementById('left').value.split(" ");
    newContent = "";
    for(var i = 0; i < content.length; i++){
      if(i == content.length - 1)
        newContent += content[i];
      else
        newContent += content[i] + "+";
    }
    let url = 'http://localhost:5000/'+ translate + '/' + translationType + '/' + newContent;
    
    // sending URL to the server
    httpRequest.open('GET', url);
    httpRequest.send();
  }