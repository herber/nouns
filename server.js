const express = require('express');
const words = require('an-array-of-english-words');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/match', (req, res) => {
  if (req.query.m == '' || req.query.m == ' ' || req.query.m == null) {
    return res.send([]);
  }
  
  const wrd = words.filter(w => !!w.match(new RegExp(req.query.m, 'i')));
  res.send(wrd);
});

app.listen(process.env.PORT || 3000);
