var userId = { userId : sessionStorage.getItem("userId")};

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

xmlhttp.open("POST", "http://localhost:3000/getUserInfo", true);
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

xmlhttp.open("POST", "http://localhost:3000/getAccountInfo", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify(userId));	
}