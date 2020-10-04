var table = require('../utilities/db');
const fs = require('fs');
let rawdata = fs.readFileSync('./seed/flights.json');
let  json_data = JSON.parse(rawdata);

var dumpData = function(){
    for (k in json_data)
   {
        table.Flight( 
        {
            "no_of_stops": k['no_of_stops'],
            "flight_no": k['flight_no'],
            "airline_name": k['airline_name'],
            "departure_time": k['departure_time'],
            "arrival_time": k['arrival_time'],
            "travel_date": k['travel_date'],
            "return_date": k['return_date'],
            "price": k['price'],
            "destination": k['destination'],
            "source": k['source']
          }
    )
        .then((res) => {
            responseCallback("success");
      }); 
    }
    
}
module.exports = {
    dumpData: dumpData
  };