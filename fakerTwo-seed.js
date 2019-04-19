const faker = require('faker');
const fs = require('fs');


const file = fs.createWriteStream("./test-data-new.csv");

var header = 'rest_id,date,time\n'

file.write(header);



(async() => {
    // let makeResTime = function () {
    //     var hour = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
    //     var minute = ['00', '15', '30'];
    //     var resHour = hour[Math.floor(Math.random()*hour.length)];
    //     var resMin = minute[Math.floor(Math.random()*minute.length)];
    //     return resHour + ':' + resMin + ':00'
    // }
  for(let i = 1; i < 100001; i++) {
    var dataGen = faker.random.number({'min': 1, 'max': 10000000})
                    +','+ faker.date.between('2019-01-01', '2019-03-31').toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
                    +','+'08:30:00'
    if(!file.write(`${dataGen}\n`)) {
        await new Promise(resolve => file.once('drain', resolve));
    }
  }
})();