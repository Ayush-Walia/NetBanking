'use strict';

var express = require("express");
var router = express.Router();
var db = require("./database/database");
var uniqid = require("uniqid");

router.post("/login", function (req, res) {
    db.query("select userId,account_accountNumber from user where userId='" + req.body.userId + "' and userPassword='" + req.body.userPassword + "';", function (err, result) {
        if (err)
            throw err;
        if (result.length > 0)
            res.end(JSON.stringify(result[0]));
        res.end();
    });
});

router.post("/getUserInfo", function (req, res) {
    db.query("select * from user where userId='" + req.body.userId + "';", function (err, result) {
        if (err)
            throw err;
        else
            res.json(result);
    });
});

router.post("/getAccountInfo", function (req, res) {
    db.query("( select * from account where account.accountNumber in( select user.account_accountNumber from user where user.userId = " + req.body.userId + " ) );",
        function (err, result) {
            if (err)
                throw err;
            else
                res.json(result);
        });
});

router.post("/sendMoney", function (req, res) {

    var pid = uniqid();
    var saccount = req.body.saccount;
    var raccount = req.body.raccount;
    var title = req.body.title;
    var amount = req.body.amount;
    var date = new Date();

    var qryLog = "insert into payment_log values (? , ? , ? , ? , ? , ?)";
    var qryReduceBal = "update account set account.accountBalance = account.accountBalance - ? where account.accountNumber = ?";
    var qryAddBal = "update account set account.accountBalance = account.accountBalance + ? where account.accountNumber = ?";

    db.query("select accountBalance from account where accountNumber = ?", [raccount], function(err, result) {
        try{
        if(err) throw err; 
        result[0].accountBalance;
        } catch(err){
            res.end("Error : Wrong account number!");
        }
    });

    db.query("select accountBalance from account where accountNumber = ?", [saccount], function(err, result) {
        if(err) throw err; 
        sendMoney(result[0].accountBalance);
    });

    function sendMoney(senderBalance){
        if(saccount==raccount){
            res.end("Error : Sender and Reciever account<br>should be different!");
        }    
        else if(senderBalance<amount){
            res.end("Error : Insufficient Balance!");
        }          
        else if(amount==0){
            res.end("Error : Amount should be greater than 0!");
        }  
        else if(senderBalance>=amount){
            db.query(qryReduceBal, [parseInt(amount), saccount], function (err) {
                if(err) throw err;
                db.query(qryAddBal, [parseInt(amount), raccount], function (err) {
                    if(err) throw err;
                    db.query(qryLog, [pid, title, amount, date, raccount, saccount],
                        function (err) {
                            if (err)
                                throw err;
                            else
                                res.end("true");
                        });
                });
            });
          }
        else{
            res.end("Error : Payment failed!");
        }
    }
});

router.post("/getSend", function (req,res) {
    var qry = "select * from payment_log where account_accountNumber = ?";
    db.query(qry, [req.body.account],
        function (err, result) {
            if (err)
                throw err;
            else
                res.json(result);
        });
});

router.post("/getRecieve", function (req,res) {
    var qry = "select * from payment_log where payment_log.recieverAccountId = ?";
    db.query(qry, [req.body.account],
        function (err, result) {
            if (err)
                throw err;
            else
                res.json(result);
        });

});

module.exports = router;