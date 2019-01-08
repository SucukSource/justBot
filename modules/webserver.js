
const express = require('express');
const app = express();

app.use(express.static('public'));

const listener = app.listen(process.env.PORT, function() {
  console.log('[WEBSERVER] Start');
});