const faker = require('faker');
const fs = require('fs');

var csvWriter = require('csv-write-stream')
var writer = csvWriter()





var makeResTime = function () {
    var hour = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    var minute = ['00', '15', '30'];
    var resHour = hour[Math.floor(Math.random()*hour.length)];
    var resMin = minute[Math.floor(Math.random()*minute.length)];
    return resHour + ':' + resMin + ':00'
}

writer.pipe(fs.createWriteStream('testData.csv'))


// async function myFunction() {
//   while(/* my condition */) {
//     const res = await db.getUser(email);
//     logger.log(res);
//   }
// }

// myFunction().then(() => {
//   /* do other stuff */
// })

// const createData = () => {
//   var count = 1;
//   let total = 10
//   while (count < total ) {
//   return new Promise(resolve => {
//      count++
//     resolve( writer.write({
//       rest_id: (faker.random.number({'min': 1, 'max': 10000000})),
//       date: faker.date.between('2019-01-01', '2019-03-31').toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
//       time: makeResTime()
//       }) 
//   )})
  

// } 
// }

const createData = () => {
  return new Promise(resolve => {
    resolve( writer.write({
      rest_id: (faker.random.number({'min': 1, 'max': 10000000})),
      date: faker.date.between('2019-01-01', '2019-03-31').toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      time: makeResTime()
      }) 
  )})
  


}


async function asyncCall() {
  // console.log('calling');
  var result = await createData();
  // console.log(result);
  // expected output: 'resolved'
}

let count = 0;
let total = 100;

while ( count < total) {
  count++;
  asyncCall();
}


 

// for (var i = 1; i < 10000; i++) {
//   writer.write({
//     id: i,
//     rest_id: (faker.random.number({'min': 1, 'max': 10000000})),
//     date: faker.date.between('2019-01-01', '2019-03-31').toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
//     time: makeResTime()
//     })
  
// }

writer.end();
