const express = require('express');
const hbs = require ('hbs');
const fs = require ('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Welcome Home!',
    welcomeMessage: "Boom! You've made it! Welcome to my page, yo.",
    })
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
  })
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    pageTitle: 'Portfolio Page',
    welcomeMessage: 'Here is a list of some of my projects that you can check out. Thanks for coming!'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "You don' messed up."
  });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
