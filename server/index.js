const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/js', express.static('public/js', { maxAge: 31557600000 }));
app.use('/css', express.static('public/css', { maxAge: 31557600000 }));
app.use('/img', express.static('public/img', { maxAge: 31557600000 }));
app.use('/', express.static('public/', { maxAge: 31557600000 }));

app.get('/*', (req, res) => {
  let data = require('fs').readFileSync('public/index.html').toString();
  res.send(data);
});

app.use((req, res) => {
  // respond with html page
  if (req.accepts('html')) {
    res.redirect('/');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.status(404).send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.status(404).type('txt').send('Not found');
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  //console.log('process.env', process.env);
  console.log(`server is listening on ${port}`)
});
