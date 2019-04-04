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
    console.log(req.body.userId);
    db.query("( select * from bank.account where bank.account.accountNumber in( select bank.user.account_accountNumber from bank.user where bank.user.userId = " + req.body.userId + " ) );",
        function (err, result) {
            if (err)
                throw err;
            else
                res.json(result);
        });
});

router.post("/sendMoney", function (req, res) {

    var qryLog = "insert into bank.payment_send values (? , ? , ? , ? , ? , ?)";
    var qryReduceBal = "upadate table  bank.account set bank.account.accountBalance = bank.account.accountBalance - ? where bank.account.accountNumber = ?";
    var qryAddBal = "upadate table  bank.account set bank.account.accountBalance = bank.account.accountBalance + ? where bank.account.accountNumber = ?";

    var pid = uniqid();
    var saccount = req.body.saccount;
    var raccount = req.body.raccount;
    var title = req.body.title;
    var amount = req.body.amount;
    var date = new Date();


    db.query(qryReduceBal, [amount, saccount], function () {
        db.query(qryAddBal, [amount, raccount], function () {
            db.query(qryLog, [id, title, amount, date, raccount, saccount],
                function (err) {
                    if (err)
                        throw err;
                    else
                        res.end("Payment Done");;
                });
        });
    });
});

module.exports = router;