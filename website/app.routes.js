// The routes sends html content

var express = require("express");
var router = express.Router();
var path = require("path"); //to get path

//root path (get index page)
//resource required = genresList, NovelsList
router.get("/", function (req, res) {
  res.sendFile("index.html",{root: path.join(__dirname)});
});


module.exports = router;