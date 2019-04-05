'use strict';

var mysql = require("mysql");
var dbconfig = require("./../.config/database.config.json")

var db = mysql.createConnection(dbconfig);

db.connect(function(err){
    if(err)
        throw err;
    else
        console.log("Database connected successfully!");
});

module.exports = db;