'use strict';

var express = require("express");
var router = express.Router();
var db = require("./models");
var uniqid = require("uniqid");
var sanitize = require('mongo-sanitize');

// TODO : Add add user function.

/*router.post("/login", function (req, res) {
   db.deleteMany({},function(err){
    if(err) console.log("error ",err);
   var sampleData = [{
        userId : "1711981069",
        userName : "Ayush",
        userPassword : "pass",
        userEmail : "ayush@gmail.com",
        userGender : "Male",
        userStreet : "C-20",
        userCity : "Chandigarh",
        userDOB : "1999-07-27",
        userPhoneNo : "8219518681",
        userAccountStatus : "ok",
        userType : "admin",
        accountNumber : "1234567890",
        accountBalance : 1352,
        accountType : "Current",
        cardNumber : "0987657890",
        accountBranchLocation : "Solan"
    },
    {
        userId : "1711981136",
        userName : "Karan",
        userPassword : "pass",
        userEmail : "karan@gmail.com",
        userGender : "Male",
        userStreet : "House 1136",
        userCity : "Kalka",
        userState : "Haryana",
        userDOB : "2000-01-01",
        userPhoneNo : "8219518680",
        userAccountStatus : "ok",
        userType : "user",
        accountNumber : "1234567890",
        accountBalance : 1358,
        accountType : "Current",
        cardNumber : "0987657890",
        accountBranchLocation : "Kalka"
    }
    ];
    db.create(sampleData, function(err, data){
        if (err) console.error(err);
        else console.log(data);
        res.end();
    });
});
});*/

router.post("/login", function (req, res) {
    db.find({userId : sanitize(req.body.userId), userPassword : sanitize(req.body.userPassword)}, function(err, response){
        if(err) console.log("Error in /login ", err);
        if(response == "")
            res.end();
        response.forEach(function(data){
				res.end(JSON.stringify({
                    userId : data.userId,
                    accountType: data.accountType,
                    userType: data.userType,
                    userAccountStatus: data.userAccountStatus
                }));
		});
    });
});

router.post("/getUserInfo", function (req, res) {
    db.find({userId : sanitize(req.body.userId)}, function(err, response){
        if(err) console.log("Error in /getUserInfo ", err);
        if(response == "")
            res.end();
        response.forEach(function(data){
				res.end(JSON.stringify({
                    userId : data.userId,
                    userName : data.userName,
                    userEmail: data.userEmail,
                    userGender: data.userGender,
                    userStreet: data.userStreet,
                    userCity: data.userCity,
                    userState: data.userState,
                    userDOB: data.userDOB,
                    userPhoneNo: data.userPhoneNo,
                    userAccountStatus: data.userAccountStatus
                }));
		});
    });
});

router.post("/getAccountInfo", function (req, res) {
    db.find({userId : sanitize(req.body.userId)}, function(err, response){
        if(err) console.log("Error in /getAccountInfo ", err);
        if(response == "")
            res.end();
        response.forEach(function(data){
				res.end(JSON.stringify({
                    accountBalance : data.accountBalance,
                    accountNumber: data.accountNumber,
                    accountType: data.accountType,
                    accountBranchLocation: data.accountBranchLocation,
                    cardNumber: data.cardNumber
                }));
		});
    });
});

router.post("/sendMoney", function (req, res) {

    //TODO : Add Blockchain support for managing transaction

    /* var pid = uniqid();
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
        });*/
});

router.post("/getRecieve", function (req,res) {
    //TODO : Add Blockchain support for managing transaction
    /*var qry = "select * from payment_log where payment_log.recieverAccountId = ?";
    db.query(qry, [req.body.account],
        function (err, result) {
            try{
                if (err)
                    throw err;
                res.json(result);
            }catch(err){
                console.log("Error in /getRecieve "+err);
            }    
        });*/
});

router.post("/updateInfo", function (req,res) {
    var requestEnded = false;
    if(req.body.userName!=undefined){
        db.update({userId : sanitize(req.body.userId)}, {$set: {userName : sanitize(req.body.userName)}},function(err){
            if(err) console.log("Error in /updateInfo userName ",err);
        });
    }
    if(req.body.userGender!=undefined){
        db.update({userId : sanitize(req.body.userId)}, {$set: {userGender : sanitize(req.body.userGender)}},function(err){
            if(err) console.log("Error in /updateInfo userGender ",err);
        });
    }
    if(req.body.userDOB!=undefined){
        db.update({userId : sanitize(req.body.userId)}, {$set: {userDOB : sanitize(req.body.userDOB)}},function(err){
            if(err) console.log("Error in /updateInfo userDOB ",err);
        });
    }
    if(req.body.userPhoneNo!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {userPhoneNo : sanitize(req.body.userPhoneNo)}},function(err){
            if(err) console.log("Error in /updateInfo userPhoneNo ",err);
        });
    }
    if(req.body.userEmail!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {userEmail : sanitize(req.body.userEmail)}},function(err){
            if(err) console.log("Error in /updateInfo userEmail ",err);
        });
    }
    if(req.body.userPassword!=undefined){
        requestEnded=true;
        if(req.body.userPassword == req.body.newPassword){
        db.find({userId : sanitize(req.body.userId), userPassword : sanitize(req.body.userPassword)},function(err, response){
            if(err) console.log("Error in /updateInfo find userPassword ",err);
            if(response != "")
                res.end(JSON.stringify(1));
        });
        }  
        db.updateOne({userId : sanitize(req.body.userId), userPassword : sanitize(req.body.userPassword)}, {$set: {userPassword : sanitize(req.body.newPassword)}},function(err, response){
            if(err) console.log("Error in /updateInfo update userPassword ",err);
            res.end(JSON.stringify(response.nModified));
        });
    }
    if(req.body.userStreet!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {userStreet : sanitize(req.body.userStreet)}},function(err){
            if(err) console.log("Error in /updateInfo userStreet ",err);
        });
    }
    if(req.body.userCity!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {userCity : sanitize(req.body.userCity)}},function(err){
            if(err) console.log("Error in /updateInfo userEmail ",err);
        });
    }
    if(req.body.userState!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {userState : sanitize(req.body.userState)}},function(err){
            if(err) console.log("Error in /updateInfo userEmail ",err);
        });
    }
    if(req.body.newuserId!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {userId : sanitize(req.body.newuserId)}},function(err){
            if(err) console.log("Error in /updateInfo newuserId ",err);
        });
    }
    if(req.body.accountType!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {accountType : sanitize(req.body.accountType)}},function(err){
            if(err) console.log("Error in /updateInfo accountType ",err);
        });
    }
    if(req.body.accountBranchLocation!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {accountBranchLocation : sanitize(req.body.accountBranchLocation)}},function(err){
            if(err) console.log("Error in /updateInfo accountBranchLocation ",err);
        });
    }
    if(req.body.cardNumber!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {cardNumber : sanitize(req.body.cardNumber)}},function(err){
            if(err) console.log("Error in /updateInfo cardNumber ",err);
        });
    }
    if(req.body.userAccountStatus!=undefined){
        db.updateOne({userId : sanitize(req.body.userId)}, {$set: {userAccountStatus : sanitize(req.body.userAccountStatus)}},function(err){
            if(err) console.log("Error in /updateInfo userAccountStatus ",err);
        });
    }

    if(requestEnded==false)
    res.end("true");
});

router.post("/getAllUsers", function (req, res) {
    db.find({}, function(err, response){
        if(err) console.log("Error in /getAllUsers ", err);
        if(response == "")
            res.end();
        var arr = [];
        response.forEach(function(data){
			arr.push({
                accountBalance : data.accountBalance,
                accountNumber: data.accountNumber,
                userName : data.userName,
                userId : data.userId,
                userType : data.userType
            });
		});
        res.end(JSON.stringify(arr));
    });
});

module.exports = router;