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

    var qryLog = "insert into payment_log values (? , ? , ? , ? , ? , ?)";
    var qryReduceBal = "update account set account.accountBalance = account.accountBalance - ? where account.accountNumber = ?";
    var qryAddBal = "update account set account.accountBalance = account.accountBalance + ? where account.accountNumber = ?";

    var pid = uniqid();
    var saccount = req.body.saccount;
    var raccount = req.body.raccount;
    var title = req.body.title;
    var amount = req.body.amount;
    var date = new Date();


    db.query(qryReduceBal, [parseInt(amount), saccount], function (err) {
        if(err) throw err;
        db.query(qryAddBal, [parseInt(amount), raccount], function (err) {
            if(err) throw err;
            db.query(qryLog, [pid, title, amount, date, raccount, saccount],
                function (err) {
                    if (err)
                        throw err;
                    else
                        res.end("Payment Done");;
                });
        });
    });
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