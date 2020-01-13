const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const axios = require("axios");
const open = require("open");
const convertfactory = require("electron-html-to");
// const api = require("./apis");
// const generateHTML = require("./generatehtml");
const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "what is your GitHub username?"
    },

    {
        type: "list",
        name: "color",
        message: "what is your favorite color?",
        choices: ["green", "blue", "pink", "red"]
    }
]).then(function (responce) {
    const queryUrl = `https://api.github.com/users/${responce.username}`;



    axios.get(queryUrl).then(res => {
        console.log(res);

        const pic = res.data.avatar_url;
        const name = res.data.name;
        const gitBlog = res.data.blog;
        const gitURL = res.data.html_url;
        const gitLoco = res.data.location;
        const gitBio = res.data.bio;
        const gitRepos = res.data.public_repos;
        const followers = res.data.followers;
        const following = res.data.following;
        const stars = 0;


        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">                
                    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                    <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                    <title>Document</title>
                    <style>
                        @page {
                          margin: 0;
                        }
                       *,
                       *::after,
                       *::before {
                       box-sizing: border-box;
                       }
                       html, body {
                       padding: 0;
                       margin: 0;
                       }
                       .wrapper {
                       background-color: ${colors[responce.color].wrapperBackground};
                       padding-top: 100px;
                       }
                       body {
                       background-color: white;
                       -webkit-print-color-adjust: exact !important;
                       font-family: 'Cabin', sans-serif;
                       }
                       main {
                       background-color: #E9EDEE;
                       height: auto;
                       padding-top: 30px;
                       }
                       h1, h2, h3, h4, h5, h6 {
                       font-family: 'BioRhyme', serif;
                       margin: 0;
                       }
                       h1 {
                       font-size: 3em;
                       }
                       h2 {
                       font-size: 2.5em;
                       }
                       h3 {
                       font-size: 2em;
                       }
                       h4 {
                       font-size: 1.5em;
                       }
                       h5 {
                       font-size: 1.3em;
                       }
                       h6 {
                       font-size: 1.2em;
                       }
                       .photo-header {
                       position: relative;
                       margin: 0 auto;
                       margin-bottom: -50px;
                       display: flex;
                       justify-content: center;
                       flex-wrap: wrap;
                       background-color: ${colors[responce.color].headerBackground};
                       color: ${colors[responce.color].headerColor};
                       padding: 10px;
                       width: 95%;
                       border-radius: 6px;
                       }
                       .photo-header img {
                       width: 250px;
                       height: 250px;
                       border-radius: 50%;
                       object-fit: cover;
                       margin-top: -75px;
                       border: 6px solid ${colors[responce.color].photoBorderColor};
                       box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                       }
                       .photo-header h1, .photo-header h2 {
                       width: 100%;
                       text-align: center;
                       }
                       .photo-header h1 {
                       margin-top: 10px;
                       }
                       .links-nav {
                       width: 100%;
                       text-align: center;
                       padding: 20px 0;
                       font-size: 1.1em;
                       }
                       .nav-link {
                       display: inline-block;
                       margin: 5px 10px;
                       }
                       .workExp-date {
                       font-style: italic;
                       font-size: .7em;
                       text-align: right;
                       margin-top: 10px;
                       }
                       .container {
                       padding: 50px;
                       padding-left: 100px;
                       padding-right: 100px;
                       }
              
                       .row {
                         display: flex;
                         flex-wrap: wrap;
                         justify-content: space-between;
                         margin-top: 20px;
                         margin-bottom: 20px;
                       }
              
                       .card {
                         padding: 20px;
                         border-radius: 6px;
                         background-color: ${colors[responce.color].headerBackground};
                         color: ${colors[responce.color].headerColor};
                         margin: 20px;
                         width: 400px;
                       }
                       .footer{
                        background-color: ${colors[responce.color].wrapperBackground}};
                       }
                       
                       .col {
                       flex: 1;
                       text-align: center;
                       }
              
                       a, a:hover {
                        style="padding-right: 15px;"
                       text-decoration: none;
                       color: blue;
                       font-weight: bold;
                       }
              
                       @media print { 
                        body { 
                          zoom: .75; 
                        } 
                       }
                    </style>
            </head>
        <body>
        <div class="container-fluid text-center wrapper">
        <div class="photo-header">
          <img class="photo-header img" src="${pic}" height="200" width="200">
        </div>
        <div>
          <h1>Hi!
            <br>
            My name is ${name}</h1>
        </div>
    <br>
        <div class="row">
            <a href="https://www.google.com/maps/place/${gitLoco}">${gitLoco}</a> 
            <a href="${gitURL}">GitHub</a>
            <a href="${gitBlog}">Blog</a>
        </div>
      </div>
      <br>
      <div class="col col-12 text-center">
        <h3>${gitBio}</h3>
      </div>
      <br>
      <div class="row justify-content-center">
        <h3 class="text-center card">
          GitHub Repositories:
          <p>${gitRepos}</p>
        </h3>
        <h3 class="text-center card">
          Followers:
          <p>${followers}</p>
        </h3>
      </div>
      <br>
      <div class="row justify-content-center">
        <h3 class="text-center card">
          GitHub Stars
          <p>${stars}</p>
        </h3>
        <h3 class="text-center card">
          Following:
          <p>${following}</p>
        </h3>
      </div>
      <div class="footer" style="height: 30px;">
      <footer>
      </footer>
      </div>
        </body>
        </html>
        `

        fs.writeFile("index.html", html, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("worked");
        })

    });
});