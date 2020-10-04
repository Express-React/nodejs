var express = require('express');
var router = express.Router();
var flight = require('../utilities/flight');
let config = require('../config');
let middleware = require('../middleware');
var bodyParser = require('body-parser');
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


router.delete("/delete_all", middleware.checkToken , (req, res) => {
    flight.destroy( {});
    res.json({
        success : true,
        response: 'success',
    })
});


router.post("/bulk/add/", middleware.checkToken , (req, res) => {

    for(let k=0;k<req.body.data.length;k++){
        
        flight.add(req.body.data[k], (result) => {
            console.log(result)     
        });
    }
    res.json({
        success : true,
        response: 'success',
    });
    
});

module.exports = router;
