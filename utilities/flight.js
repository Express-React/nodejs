/**
 * Users api
 */
var table = require('./db');

module.exports = {
    
    add:  ( oJson , responseCallback) => {
        table.Flight.create( 
            {
                "no_of_stops": oJson['no_of_stops'],
                "flight_no": oJson['flight_no'],
                "airline_name": oJson['airline_name'],
                "departure_time": oJson['departure_time'],
                "arrival_time": oJson['arrival_time'],
                "travel_date": oJson['travel_date'],
                "return_date": oJson['return_date'],
                "price": oJson['price'],
                "destination": oJson['destination'],
                "source": oJson['source']
              }
        )
            .then((res) => {
                responseCallback("success");
          }); 
          
    },

    list:  (responseCallback)=>{
        table.Flight.findAll().then((data) => {
            responseCallback(data)
          });
    },
 
    update:  (oUsers , responseCallback) => {
        table.Flight.update( { name: oUsers ["body"]["name"], 
            password: oUsers ["body"]["password"], 
             }, 
            { where: {id:  oUsers ["body"]["id"]} }
          ).then(() => {
            responseCallback(("success"))
          });        
    },
    

    remove : (id, responseCallback) => {
        table.Flight.destroy({
            where: { id: id }
        }).then((err, res) => {
            let str="deleted successfully"
            if(err != "1"){
                str = 'Requested data not found';
            }
            responseCallback(str);
        });
    } ,
    destroy : (req, responseCallback) => {
        table.Flight.destroy({
            where: {},
            truncate: true
        }).then((err, res) => {
            
            console.log(res);
        });
    } 
}