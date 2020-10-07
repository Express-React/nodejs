var express = require('express');
var router = express.Router();
var flight = require('../utilities/flight');
let config = require('../config');
let middleware = require('../middleware');
var bodyParser = require('body-parser');
const fs = require('fs');
let flight_json = fs.readFileSync('./seed/flights.json');

router.use(bodyParser.json());


router.post("/", middleware.checkToken , (req, res) => {
    flight.add(req.body.name, req.body.password, req.body.uuid, 
        (result) => {
        res.json({
            success : true,
            response: 'success',
        });
    });
});

router.get("/", middleware.checkToken , (req, res) => {
    flight.list( (result) => {
        res.json({
            success : true,
            data:result,
            response: 'success',
        });
    });
});

router.delete("/", middleware.checkToken , (req, res) => {
    flight.remove(req.body.id, (data) => {
        res.json({
            success : true,
            response: data,
        })
    });
    
});


router.delete("/all", middleware.checkToken , (req, res) => {
    flight.destroy( {});
    res.json({
        success : true,
        response: 'success',
    })
});


router.post("/seed/", middleware.checkToken , (req, res) => {
    
    let  json_data = JSON.parse(flight_json);
    for(let k=0;k<json_data.length;k++){
        
        flight.add(json_data[k], (result) => {
            console.log(result)     
        });
    }
    res.json({
        success : true,
        response: 'success',
    });
    
});

module.exports = router;
