const express = require('express');
const hbs = require('hbs');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Our routes go here:
app.get('/', (req, res) => {
  res.render('index');
});

//Axios Globals
// axios.defaults.headers.common['X-AUTH-TOKEN'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

//Axios Instance
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
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

app.get('/get-random-quote', (req, res) => {
  axios
    .get(`https://dummyjson.com/quotes/random`)
    .then(({ data }) => {
      // res.json(data);
      res.render('index', data);
    })
    .catch((err) => console.log(err));
});

app.get('/get-todo-quotes', (req, res) => {
  axios
    .all([
      axios.get(`https://dummyjson.com/quotes/random`),
      axios.get(`https://dummyjson.com/todos/`),
    ])
    .then((result) => {
      const quote = result[0].data;
      const todos = result[1].data;
      res.json({ quote, todos });
      // res.render('index', data);
    })
    .catch((err) => console.log(err));
});

// app.post('/add-todos/:userId', (req, res) => {
//   axios
//     .post(`https://dummyjson.com/todos/add`, {
//       todo: req.body.todo,
//       completed: req.body.completed ? true : false,
//       userId: req.params.userId,
//     })
//     .then(({ data }) => {
//       res.json(data);
//       //res.render('todos.hbs', data);
//     })
//     .catch((err) => console.log(err));
// });

//Using axios instance
app.post('/add-todos/:userId', (req, res) => {
  axiosInstance
    .post(`/todos/add`, {
      todo: req.body.todo,
      completed: req.body.completed ? true : false,
      userId: req.params.userId,
    })
    .then(({ data }) => {
      res.json(data);
      //res.render('todos.hbs', data);
    })
    .catch((err) => console.log(err));
});

//Axios Put/Patch
app.get('/update-todos', (req, res) => {
  axiosInstance
    .put(`/todos/1`, {
      completed: false,
    })
    .then(({ data }) => {
      res.json(data);
      //res.render('index', data);
    })
    .catch((err) => console.log(err));
});

//Axios Delete
app.get('/delete-todos', (req, res) => {
  axiosInstance
    .delete(`/todos/1`)
    .then(({ data }) => {
      res.json(data);
      //res.render('index', data);
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => console.log('Listening on port 3000'));