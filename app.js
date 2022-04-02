const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Our routes go here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/get-all-todos', (req, res) => {
  // axios({
  //   method: 'GET',
  //   url: 'https://dummyjson.com/todos',
  //   params: { limit: 5 },
  // }).then(({ data }) => {
  //   res.json(data);
  // });
  axios
    .get(`https://dummyjson.com/todos/`)
    .then(({ data }) => {
      // res.json(data);
      res.render('todos', data);
    })
    .catch((err) => console.log(err));
});

app.get('/add-todos/:userId', (req, res) => {
  axios
    .post(`https://dummyjson.com/todos/add`, {
      todo: req.query.todo,
      completed: req.query.completed ? true : false,
      userId: req.params.userId,
    })
    .then(({ data }) => {
      res.json(data);
      //res.render('todos.hbs', data);
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => console.log('Listening on port 3000'));
