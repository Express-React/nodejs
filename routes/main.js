var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
const base_path = "/tmp/";
const csv_path_abusive = base_path + "filterwords.csv";
const csv_abusive_name = 'filterwords.csv';
var formidable = require('formidable');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, '../', 'static')));
//var   request = require('request');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

function getFileContent(path) {
    var str = fs.readFileSync(path, 'utf8');
    return str
}

router.get("/formData", function(req, res) {
    res.json({
        success : true,
        "response": "success",
        "data": formList
    });
    res.end();
});

router.post("/upload", function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.csvdata.path;
        var fileName = files.csvdata.name;
        var saving_path = base_path + "/" + fileName;
        fs.rename(oldpath, saving_path, function(err) {
            if (err) throw err;
            //res.sendFile(__dirname + '/index.html');
            res.end();

        });
    });
});
router.get("/getAbusiveFile", function(req, res) {
    var content = getFileContent(csv_path_abusive);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=' + csv_abusive_name);
    res.write(content, 'UTF-8');
    res.end();
});
router.get("/save/speech/:mp3FileName", function(req, res) {
    var mp3File =  req.params.mp3FileName;
    var file = fs.readFileSync('/tmp/' + mp3File, 'binary');
    //res.download('/tmp/title.mp3');
    //res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'attachment; filename='+mp3File);
    res.write(file, 'binary');
    res.end();
})

router.post("/uploadAbusiveWords", function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.csvdata.path;
        var fileName = "filterwords.csv";
        var saving_path = base_path + "/" + fileName;
        fs.rename(oldpath, saving_path, function(err) {
            if (err) throw err;
            res.sendFile(path.join(__dirname, '../', 'index.html'));
            //

        });
    });
});
module.exports = router;
