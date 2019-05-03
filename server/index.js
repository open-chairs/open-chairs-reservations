require('newrelic');
const express = require('express');
const path = require('path');
const dbQuery = require('../database/index.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const compression = require('compression');

app.use(cors());
app.use(bodyParser.json())
app.use(compression());

const port = process.env.port || 3000;

app.use('/:urlID', express.static(path.join(__dirname, '../public')));

app.get('/loaderio-5f1d96b3a51c00c3c491dbcfecc52686', (req, res) => {
  res.send('/loaderio-5f1d96b3a51c00c3c491dbcfecc52686')
})
// refactor when live-data is inputted
app.get('/times/:urlID', (req, res) => {
  let restID = req.params.urlID;
  console.log(req.params.calDate);

  dbQuery.getTimes(restID)
    .then((data) => {
      console.log(data)
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    })
})

app.post('/reservation', (req, res) => {
  let restID = req.params.urlID;
    dbQuery.postReservation(restID)
      .then((data) => {
        console.log(data)
        res.send(data)
      })
      .catch((err) => {
        res.sendStatus(err)
      })
})

app.patch('/reservation/:urlID', (req, res) => {
  let restID = req.params.urlID;
  dbQuery.updateReservation(restID)
    .then((data) => {
      console.log(data);
      res.send(data)
    })
    .catch((err) => {
      res.sendStatus(err)
    })
})

app.delete('/times:urlID', (req, res) => {
  let restID = req.params.urlID;
  dbQuery.deleteReservation(restID)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(err)
    })
})
app.listen(port, console.log(`server is listening on port ${port}`));

