/*
Name:        Muhtasim Al-Farabi
Course:      CSc 337
File:        translator.js
Description: This program uses an express server to translate words/sentences
            from English to Spanish/German and vice verca and Spanish to 
            German and vice versa. It reads Spanish.txt and German.txt
            and stores the 'from' words as keys and 'to' words as values
            of several dictionaries. Then, it translates it using 
            corresponding functions. 
  
 */

// importing modules
const express = require('express')
const fs = require('fs');
const readline = require('readline');
const { PassThrough } = require('stream');
const app = express();
const port = 5000;

// using the public_html directory's files 
app.use(express.static('public_html'))

let englishSpanishDict = {};
let spanishEnglishDict = {};
let englishGermanDict = {};
let germanEnglishDict = {};

/**
 * This function returns a boolean by checking whether a String has
 * special characters or not 
 * @param temp is the word to be checked for only alphanumerics
 */

function checkNumeric(temp) {
    return temp != '.' && temp != ',' && temp != '(' && temp != '[' &&
        temp != '{' && temp != '/'  && temp!= ';';
}

/**
 * This function asynchronously loads lines from the text file to
 * corresponding dictionaries.
 */

async function loadWordSpanish() {
    const fileStream = fs.createReadStream('Spanish.txt');
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    for await (const line of rl) {
        words = line.split("\t");
        engWord = words[0].toLowerCase().trim();
        if (engWord.charAt(0) == '#') {
            continue;
        }
        spanishWord = "";
        for (i = 0; i < words[1].length; i++) {
            temp = words[1][i];
            if (checkNumeric(temp))
                spanishWord += words[1][i];
            else
                break;
        }
        spanishWord = spanishWord.toLowerCase().trim();
        englishSpanishDict[engWord] = spanishWord;
        spanishEnglishDict[spanishWord] = engWord;
        }
}

/**
 * This function asynchronously loads lines from the text file to
 * corresponding dictionaries.
 */

async function loadWordGerman() {
    const fileStream = fs.createReadStream('German.txt');
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    for await (const line of rl) {
        words = line.split("\t");
        engWord = words[0].toLowerCase().trim();
        if (engWord.charAt(0) == '#') {
            continue;
        }
        germanWord = "";
        for (i = 0; i < words[1].length; i++) {
            temp = words[1][i];
            if (checkNumeric(temp))
                germanWord += words[1][i];
            else
                break;
        }
        germanWord = germanWord.toLowerCase().trim();
        englishGermanDict[engWord] = germanWord;
        germanEnglishDict[germanWord] = engWord;
        
    }
}

/**
 * This function takes a string and translates it from English to Spanish
 * and then prints the translation in the browser
 *
 * 
 * @param  content is the string to be translated
 */


function translateE2S(content) {
    var response = "";
    contentWords = content.split('+');
    for (i = 0; i < contentWords.length; i++) {
        temp = contentWords[i];
        temp2 = englishSpanishDict[temp];
        if (temp2 === undefined)
            temp2 = "?";
        response+= temp2 + " ";
    }
    
    return response;
}

/**
 * This function takes a string and translates it from Spanish to English
 * and then prints the translation in the browser
 * 
 * @param  content is the string to be translated
 */


function translateS2E(content) {
    var response = "";
    contentWords = content.split('+');
    
    for (i = 0; i < contentWords.length; i++) {
        temp = contentWords[i];
        temp2 = spanishEnglishDict[temp];
        if (temp2 === undefined)
            temp2 = "?";
        response+= temp2 + " ";
    }
    return response;
}

/**
 * This function takes a string and translates it from English to German
 * and then prints the translation in the browser
 * 
 * @param  content is the string to be translated
 */


function translateE2G(content) {
    var response = "";
    contentWords = content.split('+');
    for (i = 0; i < contentWords.length; i++) {
        temp = contentWords[i];
        temp2 = englishGermanDict[temp];
        if (temp2 === undefined)
            temp2 = "?";
        response+= temp2 + " ";
    }
    return response;
}

/**
 * This function takes a string and translates it from German to English
 * and then prints the translation in the browser
 * 
 * @param  content is the string to be translated
 */


function translateG2E(content) {
    var response = "";
    contentWords = content.split('+');
    for (i = 0; i < contentWords.length; i++) {
        temp = contentWords[i];
        temp2 = germanEnglishDict[temp];
        if (temp2 === undefined)
            temp2 = "?";
        response+= temp2 + " ";
    }
    return response;
}

/**
 * This function takes a string and translates it from Spanish to German
 * and then prints the translation in the browser
 * 
 * @param  content is the string to be translated
 */


function translateS2G(content) {
    var response = "";
    contentWords = content.split('+');
    for (i = 0; i < contentWords.length; i++) {
        temp = contentWords[i];
        s2e = spanishEnglishDict[temp];
        if(s2e === undefined){
            s2e = "?";
            response += s2e + " ";
        }
        else{
        temp2 = englishGermanDict[s2e];
        if(temp2 === undefined)
            temp2 = "?";
        response += temp2 + " ";
        }
    }
    return response;
}

/**
 * This function takes a string and translates it from German to Spanish
 * and then prints the translation in the browser
 * 
 * @param  content is the string to be translated
 */


function translateG2S(content) {
    var response = "";
    contentWords = content.split('+');
    for (i = 0; i < contentWords.length; i++) {
        temp = contentWords[i];
        g2e = germanEnglishDict[temp];
        if(g2e === undefined){
            g2e = "?";
            response += g2e + " ";
        }
        else{
        temp2 = englishSpanishDict[g2e];
        if(temp2 === undefined)
            temp2 = "?";
        response += temp2 + " ";
        }
    }
    return response;
}

// calls both of the load functions

loadWordSpanish();
loadWordGerman();

/**
 * This is the express get() method call
 */

 app.get('/:str/:translationType/:content', function (req, res) {
    res.statusCode = 200;
    var str = req.params.str;
    var translationType = req.params.translationType;
    var content = req.params.content;
    var answer = "";
    if (content === null)
        console.log("no input");
    if (str == "translate") {
        if (translationType == "e2s")
            answer = translateE2S(content);
        else if (translationType == "s2e")
            answer = translateS2E(content);
        else if (translationType == "e2g")
            answer = translateE2G(content);
        else if (translationType == "g2e")
            answer = translateG2E(content);
        else if (translationType == "s2g")
            answer = translateS2G(content);
        else if (translationType == "g2s")
            answer = translateG2S(content);
        else{
            temp = content.split("+");
            for(var i = 0; i < temp.length; i++){
                if (i == 0)
                    answer += temp[i];
                else
                    answer += " " + temp[i];
            }
        }
    }
    else {
        res.end("Ok");
    }

    res.end(answer);
    
});

/**
 * This function prints out the server port in the console
 * */

 app.listen(port, () => 
 console.log(`App listening at http://localhost:${port}`));