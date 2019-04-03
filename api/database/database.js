'use strict';

var mysql = require("mysql");
var dbconfig = require("./dbconfig");

var db = mysql.createConnection(dbconfig);

db.connect(function(err){
    if(err)
        throw err;
    else
        console.log("database connected successfully!");
});

module.exports = db;