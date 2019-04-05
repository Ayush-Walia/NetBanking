var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000;
var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
var userId = { userId : userInfo.userId};

if(document.getElementById("summaryPage")!=null){
getSummary();
getBalance();
}

function getSummary(){	
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200){
	var res = JSON.parse(this.responseText.replace(/[\[\]]/g,''));
    document.getElementById("greetingMessage").innerHTML = "Hi,"+ res.userName+"!";
  }
};

xmlhttp.open("POST", apiMachine + "/getUserInfo", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify(userId));	
}

function getBalance(){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200){
	var res = JSON.parse(this.responseText.replace(/[\[\]]/g,''));
    document.getElementById("accountBalance").innerHTML = "Balance: ₹ "+ res.accountBalance+"/-";
  }
};

xmlhttp.open("POST", apiMachine + "/getAccountInfo", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify(userId));	
}