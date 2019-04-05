'use strict';

//api route 
var express = require("express");
var router = express.Router();
var uniqid = require("uniqid");

//database
var db = require("./../scripts/database");
var qry = require("./../.config/database.query")

//token
var tokenService = require("./../token/tokenService");


//api/login
router.post("/login", function (req, res) {
    db.query(qry.login, [req.body.userId, req.body.userPassword], function (err, result) {
        if (err)
            throw err;

        if (result.length > 0)
            tokenService.createUserToken(result[0].userId, result[0].account_accountNumber,
                function (newtoken) {
                    res.end(newtoken);
                })
        res.end();
    });
});

//api/getUserInfo
router.get("/getUserInfo", function (req, res) {
    var usertoken = req.headers.token;

    if (!usertoken) res.end();

    tokenService.verifyUserToken(usertoken, function (err, decode) {
        if (err) res.end();
        db.query(qry.userInfo, [decode.userId], function (err, result) {
            if (err)
                throw err;
            else
                res.json(result[0]);
        });
    })
});

router.get("/getUserName",function (req,res) {
    var usertoken = req.headers.token;

    if (!usertoken) res.end();

    tokenService.verifyUserToken(usertoken, function (err, decode) {
        if (err) res.end();
        db.query(qry.getName, [decode.userId],
            function (err, result) {
                if (err)
                    throw err;
                else
                    res.json(result[0]);
            });
    });
})

router.get("/getAccountBal", function (req, res) {
    var usertoken = req.headers.token;

    if (!usertoken) res.end();

    tokenService.verifyUserToken(usertoken, function (err, decode) {
        if (err) res.end();
        db.query(qry.getBal, [decode.userAccount],
            function (err, result) {
                if (err)
                    throw err;
                else
                    res.json(result[0]);
            });
    });
});

router.get("/getAccountInfo", function (req, res) {
    var usertoken = req.headers.token;

    if (!usertoken) res.end();

    tokenService.verifyUserToken(usertoken, function (err, decode) {
        if (err) res.end();
        db.query(qry.accountInfo, [decode.userAccount],
            function (err, result) {
                if (err)
                    throw err;
                else
                    res.json(result[0]);
            });
    });
});

router.post("/sendMoney", function (req, res) {
    var usertoken = req.headers.token;

    if (!usertoken) res.end();

    var raccount = req.body.raccount;
    var title = req.body.title;
    var amount = req.body.amount;

    tokenService.verifyUserToken(usertoken, function (err, decode) {
        if (err) res.end()

        db.query(qry.getBal, function (err, bal) {
            if (err) throw err;

            if (bal - amount < 0)
                res.end();

            db.query(qry.reduceBal, [parseInt(amount), decode.userAccount], function (err) {
                if (err) throw err;
                db.query(qryAddBal, [parseInt(amount), raccount], function (err) {
                    if (err) throw err;
                    db.query(qryLog, [uniqid(), title, amount, new Date(), raccount, decode.userAccount],
                        function (err) {
                            if (err)
                                throw err;
                            else
                                res.end("Payment Done");;
                        });
                });
            });
        });
    });
})


router.post("/getSend", function (req, res) {
    var usertoken = req.headers.token;

    if (!usertoken) res.end();

    tokenService.verifyUserToken(usertoken, function (err, decode) {
        if (err) res.end();
        db.query(qry.send, [decode.userAccount], function (err, result) {
            if (err)
                throw err;
            else
                res.json(result);
        });
    })
});

router.post("/getRecieve", function (req, res) {
    var usertoken = req.headers.token;

    if (!usertoken) res.end();

    var raccount = req.body.raccount;

    tokenService.verifyUserToken(usertoken, function (err, decode) {
        if (err) res.end();
        db.query(qry.recieve, [decode.userAccount, raccount], function (err, result) {
            if (err)
                throw err;
            else
                res.json(result);
        });
    })
});

module.exports = router;