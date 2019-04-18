'use strict';

var mysql = require("mysql");
var dbconfig = require("./dbconfig");

var db = mysql.createPool(dbconfig);

module.exports = db;