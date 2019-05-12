require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const ctrl = require('./controller');


const { CONNECTION_STRING, SERVER_PORT } = process.env

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Connected to database')

  app.listen(SERVER_PORT, () =>
  console.log(`Listening on port ${SERVER_PORT}`)
  );
});

const app = express();

app.use(bodyParser.json());

app.put('/scrape', function(req, res){
url = req.body.url;

  request(url, function(error, response, html){
      if(!error){
          var $ = cheerio.load(html);

          var json = {};


          $('.title_wrapper').filter(function(){


              var data = $(this);


             var title = data.children().first().text();

              json.title = title;
              
          })
          $('#title-overview-widget > div.vital > div.title_block > div > div.ratings_wrapper > div.imdbRating > div.ratingValue > strong > span').filter(function(){
            var data = $(this);


            var rating = data.text();


            json.rating = rating;
            
        })
        $('#title-overview-widget > div.vital > div.slate_wrapper > div.poster > a > img').filter(function(){
          var data = $(this);

          var poster = data.attr('src')
          json.poster = poster
          
        })
      }
      res.status(200).send(json)
  })
})

exports = module.exports = app;

