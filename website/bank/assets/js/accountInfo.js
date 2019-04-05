var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000 + '/api';

if (document.getElementById("accountInfoPage") != null) {
	getUserInfo();
	getAccountInfo();
}

function setUserInfo(res) {
	document.getElementById("name").innerHTML = res.userName;
	document.getElementById("gender").innerHTML = res.userGender;
	document.getElementById("dob").innerHTML = res.userDOB;
	document.getElementById("userStreet").innerHTML = res.userStreet;
	document.getElementById("userCity").innerHTML = res.userCity;
	document.getElementById("userState").innerHTML = res.userState;
	document.getElementById("phoneNumber").innerHTML = res.userPhoneNo;
}

function setAccountInfo(res) {
	document.getElementById("accountNumber").innerHTML = res.accountNumber;
	document.getElementById("accountBalance").innerHTML = "₹ " + res.accountBalance + "/-";
	document.getElementById("cardNumber").innerHTML = res.cardNumber;
	document.getElementById("accountType").innerHTML = res.accountType;
	document.getElementById("branchLocation").innerHTML = res.accountBranchLocation;
}

function getUserInfo() {
	$.ajax({
    type: "GET",
    url: apiMachine + '/getUserInfo',
    async: true,
    headers: {
      token: sessionStorage.getItem("token"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    success: function (data) {
      setUserInfo(data);
    }
  });
}

function getAccountInfo() {
	$.ajax({
    type: "GET",
    url: apiMachine + '/getAccountInfo',
    async: true,
    headers: {
      token: sessionStorage.getItem("token"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    success: function (data) {
      setAccountInfo(data);
    }
  });
}