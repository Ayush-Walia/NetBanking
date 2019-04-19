var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000;
var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
var userId = { userId : userInfo.userId};

getUserInfo();
getAccountInfo();

function getUserInfo(){	
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200){
	var res = JSON.parse(this.responseText.replace(/[\[\]]/g,''));
  var dob = new Date(res.userDOB);
  document.getElementById("name").innerHTML = res.userName;
	document.getElementById("gender").innerHTML = res.userGender;
	document.getElementById("dob").innerHTML = dob.getDate()+"-"+(dob.getMonth()+1)+"-"+dob.getFullYear();
	document.getElementById("userStreet").innerHTML = res.userStreet;
	document.getElementById("userCity").innerHTML = res.userCity;
	document.getElementById("userState").innerHTML = res.userState;
	document.getElementById("phoneNumber").innerHTML = res.userPhoneNo;
  }
};

xmlhttp.open("POST", apiMachine + "/getUserInfo", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify(userId));	
}

function getAccountInfo(){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200){
	var res = JSON.parse(this.responseText.replace(/[\[\]]/g,''));
  document.getElementById("accountNumber").innerHTML = res.accountNumber;
	document.getElementById("accountBalance").innerHTML = "₹ "+ res.accountBalance+"/-";
	document.getElementById("cardNumber").innerHTML = res.cardNumber;
	document.getElementById("accountType").innerHTML = res.accountType;
	document.getElementById("branchLocation").innerHTML = res.accountBranchLocation;
  }
};

xmlhttp.open("POST", apiMachine + "/getAccountInfo", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify(userId));	
}