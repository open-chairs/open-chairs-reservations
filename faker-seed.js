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



for (var i = 1; i < 1000; i++) {
  writer.write({
    rest_id: (faker.random.number({'min': 1, 'max': 10000000})),
    date: faker.date.between('2019-01-01', '2019-03-31').toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    time: makeResTime()
    })
  
}

writer.end();
