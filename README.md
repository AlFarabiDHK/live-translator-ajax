# Overview
This project uses an [`express`](https://expressjs.com/) server to translate words/sentences from English to Spanish/German and vice verca and Spanish to German and vice versa. It also uses ajax for client-server communication. The server loads the text files ([`Spanish.txt`](https://github.com/AlFarabiDHK/live-translator-ajax/blob/main/Spanish.txt) and [`German.txt`](https://github.com/AlFarabiDHK/live-translator-ajax/blob/main/German.txt)) asynchronously for efficiency.

# How to Run
### Install these before running
* Make sure that run `npm update` to upgrade to the latest version
* Run  `npm install node express` 

Then, clone the repo with: `git clone https://github.com/AlFarabiDHK/live-translator-ajax.git`

I am using: `node 17.4.0` and `express 4.17.3`

Now, run `node transtor.js` and go to [`localhost:5000`](http://localhost:5000/) to use the app
 
