// const mysql = require('mysql');
const Promise = require('bluebird');

var pg = require('pg');
// var conString = "postgres://me:password@localhost:5432/openchairs";

var conString = "postgres://jason:secret-33-sauce@ec2-34-212-99-23.us-west-2.compute.amazonaws.com:5432/openchairs";


const connection = new pg.Client(conString);
connection.connect();



// const connection = mysql.createConnection({
//   user: 'root',
//   password: '',
//   database: 'reservations'
// });

// hard-coded data for now
// refactor when live-data is used
// const getTimes = (restID) => {
//   return new Promise((resolve, reject) => {
//     connection.query(`select reserved.time from reserved, restaurants 
//       where restaurants.id=${restID} and 
//       reserved.rest_id = restaurants.id and  
//       reserved.date = '2019-02-20'`, (err, results) => {
//         if(err){
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     })
//   })
// }

// const getTimes = (restID) => {
//   return new Promise((resolve, reject) => {
//     connection.query(`SELECT reservations.time FROM reservations 
//       WHERE reservations.rest_id=${restID} and   
//       reservations.date = '2019-02-21'`, (err, results) => {
//         if(err){
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     })
//   })
// }

const getTimes = (restID) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT reservations.time FROM reservations 
      WHERE reservations.rest_id=${restID} `, (err, results) => {
        if(err){
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}

const postReservation = (restID) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO reserved (rest_id, date, time) VALUES (1 ,'2019-02-21', '20:00:00')`, (err, results) => {
      if(err){
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}

const updateReservation = (restID) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE reserved SET date = '2080-02-22',  time = '08:00:00'
      WHERE rest_id = ${restID}`, (err, results) => {
      if(err){
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}

const deleteReservation = (restID) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM reserved WHERE id = '${restID}'`, (err, results) => {
      if(err){
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}


module.exports = {
  getTimes,
  postReservation,
  updateReservation,
  deleteReservation
};