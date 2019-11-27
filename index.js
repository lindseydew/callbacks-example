const express = require('express')
const app = express()
const port = 3000
const db = require('./db/query.js')

app.get('/callback', (req, res) => {
  db.getTimeFromDbCallback(function(time) {
    res.send(time.toString());
  });
});

app.get('/callbackx2', (req, res) => {
  db.getTimeFromDbCallback(function(time1) {
    db.getTimeFromDbCallback(function(time2){
      res.send(time1 + " " + time2);
    })
  });
});

app.get('/promise', (req, res) => {
  db.getTimeFromDbPromise().then(time => {
    res.send(time.toString())
  })
})

app.get('/promisex2', (req, res) => {
  db.getTimeFromDbPromise().then(time1 => {
    db.getTimeFromDbPromise().then(time2 => {
        res.send(time1 + " " + time2)
    })
  });
});

app.get('/async', async (req, res) => {
  time = await db.getTimeFromDbPromise()
  res.send(time);
});

app.get('/asyncx2', async (req, res) => {
  time1 = await db.getTimeFromDbPromise()
  time2 = await db.getTimeFromDbPromise()
  res.send(time1 + " " + time2);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
