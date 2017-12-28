/************************************************
**                                             **
**              AUTOCOSTS.INFO                 **
**      the automobile costs calculator        **
**                                             **
************************************************/

const $ = require('jQuery');
const express = require('express');
const Handlebars = require('handlebars');
var app = express();

var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";

var template = Handlebars.compile(source);
 
var data = { "name": "Alan", "hometown": "Somewhere, TX",
             "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};

var result = template(data);

// respond with "hello world" when a GET request is made to the homepage
app.get('/:Country', function (req, res) {
  res.send(result);
})

app.listen(3004, function () {
  console.log('Example app listening on port 3004!');
});