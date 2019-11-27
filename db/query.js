
var async = require('async');
var pg = require('pg');
var config = {
   user: '',
   database: 'mvc',
   password: '',
   host: 'localhost',
   port: 5432,
   max: 10, //can change if needed, number of clients in pool
   idleTimeoutMillis: 30000,
};

const { Client } = require('pg')
// pools will use environment variables
// for connection information

const client = new Client({
  user: '',
  database: 'callbacks_example',
  password: '',
  host: 'localhost',
  port: 5432,
  max: 10, //can change if needed, number of clients in pool
  idleTimeoutMillis: 30000,
})
client.connect()

res = client.query('SELECT NOW()')

function getTimeFromDbCallback(callback) {
  client.query('SELECT NOW()', function(err, res) {
    callback(res.rows[0]['now']);
  });
}

function getTimeFromDbPromise() {
  return client.query('SELECT NOW()').then(res => res.rows[0]['now'])
}


module.exports.getTimeFromDbCallback = getTimeFromDbCallback
module.exports.getTimeFromDbPromise = getTimeFromDbPromise
