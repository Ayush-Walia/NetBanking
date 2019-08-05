'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NetbankingSchema = new Schema({
    userId: String,
    userName: String,
    userPassword: String,
    userEmail: String,
    userGender: String,
    userStreet: String,
    userCity: String,
    userState: String,
    userDOB: Date,
    userPhoneNo: String,
    userAccountStatus: String,
    userType: String,
    accountNumber: String,
    accountBalance: Number,
    accountType: String,
    accountBranchLocation: String,
    cardNumber: String,
});

var netbanking = mongoose.model("netbanking", NetbankingSchema, "netbanking");

module.exports = netbanking;