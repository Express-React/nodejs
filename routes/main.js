var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, '../', 'static')));
//var   request = require('request');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});



module.exports = router;
