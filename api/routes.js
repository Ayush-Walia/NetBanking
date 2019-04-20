'use strict';

var express = require("express");
var router = express.Router();
var db = require("./database/database");
var uniqid = require("uniqid");

router.post("/login", function (req, res) {
    db.query("select userId,account_accountNumber from user where userId=? and userPassword=?;",[req.body.userId ,req.body.userPassword] , function (err, result) {
        try{
            if (err)
                throw err;
            if (result.length > 0)
                res.end(JSON.stringify(result[0]));
            res.end();
        }catch(err){
            console.log("Error in /login "+err);
        }
    });
});

router.post("/getUserInfo", function (req, res) {
    db.query("select * from user where userId=?;",[req.body.userId] , function (err, result) {
        try{
            if (err)
                throw err;
            res.json(result);
        }catch(err){
            console.log("Error in /getUserInfo "+err);
        }
    });
});

router.post("/getAccountInfo", function (req, res) {
    db.query("( select * from account where account.accountNumber in( select user.account_accountNumber from user where user.userId =? ) );", [req.body.userId],
        function (err, result) {
            try{
                if (err)
                    throw err;
                res.json(result);
            }catch(err){
                console.log("Error in /getAccountInfo "+err);
            }    
        });
});

router.post("/sendMoney", function (req, res) {

    var pid = uniqid();
    var saccount = req.body.saccount;
    var raccount = req.body.raccount;
    var title = req.body.title;
    var amount = req.body.amount;
    var isValidRecieverAccount = true;
    var date = new Date();

    var qryLog = "insert into payment_log values (? , ? , ? , ? , ? , ?)";
    var qryReduceBal = "update account set account.accountBalance = account.accountBalance - ? where account.accountNumber = ?";
    var qryAddBal = "update account set account.accountBalance = account.accountBalance + ? where account.accountNumber = ?";

    db.query("select accountBalance from account where accountNumber = ?", [raccount], function(err, result) {
        try{
            if(err) 
                throw err; 
            result[0].accountBalance;
        }catch(err){
            isValidRecieverAccount = false;
            res.end("Error : Wrong account number!");
        }
    });

    db.query("select accountBalance from account where accountNumber = ?", [saccount], function(err, result) {
        try{
            if(err)
                throw err; 
            if(isValidRecieverAccount==true)
            sendMoney(result[0].accountBalance);
        }catch(err){
            console.log("Error in /sendMoney "+err);
        }
    });

    function sendMoney(senderBalance){
        if(saccount==raccount){
            res.end("Error : Sender and Reciever account<br>should be different!");
        }    
        else if(senderBalance<amount){
            res.end("Error : Insufficient Balance!");
        }          
        else if(amount<0){
            res.end("Error : Amount should be greater than 0!");
        }  
        else if(senderBalance>=amount){
            db.query(qryReduceBal, [parseInt(amount), saccount], function (err) {
                if(err) 
                    throw err;
                db.query(qryAddBal, [parseInt(amount), raccount], function (err) {
                    if(err) 
                        throw err;
                    db.query(qryLog, [pid, title, amount, date, raccount, saccount],
                        function (err) {
                            if (err)
                                throw err;
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
            try{
                if (err)
                    throw err;
                res.json(result);
            }catch(err){
                console.log("Error in /getSend "+err);
            }    
        });
});

router.post("/getRecieve", function (req,res) {
    var qry = "select * from payment_log where payment_log.recieverAccountId = ?";
    db.query(qry, [req.body.account],
        function (err, result) {
            try{
                if (err)
                    throw err;
                res.json(result);
            }catch(err){
                console.log("Error in /getRecieve "+err);
            }    
        });

});

router.post("/updateInfo", function (req,res) {
    var requestEnded = false;
    if(req.body.userName!=undefined){
        db.query('update user set userName = ? where userId= ?',[req.body.userName,req.body.userId],
        function (err) {
            try{
                if (err)
                    throw err;
            }catch(err){
                console.log("Error in /updateInfo userName "+err);
            }    
        });
    }
    if(req.body.userGender!=undefined){
        db.query('update user set userGender = ? where userId= ?',[req.body.userGender,req.body.userId],
        function (err) {
            try{
                if (err)
                    throw err;
            }catch(err){
                console.log("Error in /updateInfo userGender "+err);
            }    
        });
    }
    if(req.body.userDOB!=undefined){
        db.query('update user set userDOB = ? where userId= ?',[req.body.userDOB,req.body.userId],
        function (err) {
            try{
                if (err)
                    throw err;
            }catch(err){
                console.log("Error in /updateInfo userDOB "+err);
            }    
        });
    }
    if(req.body.userPhoneNo!=undefined){
        db.query('update user set userPhoneNo = ? where userId= ?',[req.body.userPhoneNo,req.body.userId],
        function (err) {
            try{
                if (err)
                    throw err;
            }catch(err){
                console.log("Error in /updateInfo userPhoneNo "+err);
            }    
        });
    }
    if(req.body.userEmail!=undefined){
        db.query('update user set userEmail = ? where userId= ?',[req.body.userEmail,req.body.userId],
        function (err) {
            try{
                if (err)
                    throw err;
            }catch(err){
                console.log("Error in /updateInfo userEmail "+err);
            }    
        });
    }
    if(req.body.userPassword!=undefined){
        requestEnded=true;
        db.query('update user set userPassword = ? where (userId= ? and userPassword = ?)',[req.body.newPassword,req.body.userId,req.body.userPassword],
        function (err,result) {
            try{
                if (err)
                    throw err;    
                res.end(JSON.stringify(result.affectedRows));
            }catch(err){
                console.log("Error in /updateInfo userPassword "+err);
            }    
        });
    }
    if(req.body.userStreet!=undefined){
        db.query('update user set userStreet = ? where userId= ?',[req.body.userStreet,req.body.userId],
        function (err) {
            try{
                if (err)
                    throw err;
            }catch(err){
                console.log("Error in /updateInfo userStreet "+err);
            }    
        });
    }
    if(req.body.userCity!=undefined){
        db.query('update user set userCity = ? where userId= ?',[req.body.userCity,req.body.userId],
        function (err) {
            try{
                if (err)
                    throw err;
            }catch(err){
                console.log("Error in /updateInfo userCity "+err);
            }    
        });
    }
    if(req.body.userState!=undefined){
        db.query('update user set userState = ? where userId= ?',[req.body.userState,req.body.userId],
        function (err) {
            try{
                if (err)
                    throw err;
            }catch(err){
                console.log("Error in /updateInfo userState "+err);
            }    
        });
    }

    if(requestEnded==false)
    res.end("true");
});

router.post("/getAllUsers", function (req, res) {
    db.query("select user.userId,user.userName,user.account_accountNumber,account.accountBalance from user inner join account on user.account_accountNumber=account.accountNumber where userId!=0;", function (err, result) {
        try{
            if (err)
                throw err;
            res.json(result);
        }catch(err){
            console.log("Error in /getUserInfo "+err);
        }
    });
});

module.exports = router;