'use strict';

var express = require("express");
var router = express.Router();
var db = require("./database/database");

router.post("/login",function(req, res){
    db.query("select * from user where userId='"+req.body.userId+"' and userPassword='"+req.body.userPassword+"';",function(err, result){
        if (err) 
            throw err;
        if(result.length>0)
            res.json(true);
        else
            res.json(false);
    });
});

router.post("/getUserInfo",function(req, res){
    db.query("select * from user where userId='"+req.body.userId+"';",function(err, result){
        if (err) 
            throw err;
        else
            res.json(result);
    });
});

router.post("/getAccountInfo",function(req, res){
    db.query("select * from account where userId='"+req.body.userId+"';",function(err, result){
        if (err) 
            throw err;
        else
            res.json(result);
    });
});

router.get("/login/:userId/:userPassword/transactions/",function(req, res){
    db.query("select * from payment where userId='"+req.params.userId+"';",function(err, result){
        if (err) 
            throw err;
        else
        res.json(result);
    });
});

module.exports = router;
