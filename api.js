const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.get('*', (req, res) => {
  const param = req.params[0].split('/')[1];
  if (param === 'a') {
    setTimeout(() => {
      res.send(param);
    }, 1000);
  } else if (param === 'b') {
    setTimeout(() => {
      res.send(param);
    }, 2000);
  } else if (param === 'c') {
    res.send(param);
  } else if (param === 'd') {
    setTimeout(() => {
      res.send(param);
    }, 500);
  } else if (param === 'kill-server') {
    res.send('Server Shutting Down');
    server.close(() => {
      console.log('express app shut down');
    });
  } else {
    res.status(404).send('Oh uh, something went wrong');
  }
});

const server = app.listen(port, (err, res) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('express app listening on:', port);
  }
});
