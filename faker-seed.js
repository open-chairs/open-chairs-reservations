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

var rest_id = () => {
  return faker.random.number({'min': 1, 'max': 10000000});
}

var date = () => {
 return faker.date.between('2019-05-01', '2019-08-31');
}

function convert(str) {
  var date = new Date(str),
      mnth = ("0" + (date.getMonth()+1)).slice(-2),
      day  = ("0" + date.getDate()).slice(-2);
  return [ date.getFullYear(), mnth, day ].join("-");
}


const createReservation = () => {
  
  return {rest_id: rest_id(), date: convert(date()), time: makeResTime()}
}

function writeMillionsOfReservations() {
  let i = 100000000;
  writeReservations();
  function writeReservations() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        writer.write(createReservation());
      } else {
        ok = writer.write(createReservation());
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', writeReservations);
    }
  }
}

writeMillionsOfReservations();



