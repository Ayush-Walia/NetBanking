function loginRequest(){
var xmlhttp = new XMLHttpRequest();
sessionStorage.setItem("userId", document.getElementById("userId").value);
sessionStorage.setItem("userPassword", document.getElementById("userPassword").value);
var login_credentials = { userId : sessionStorage.getItem("userId"), userPassword : sessionStorage.getItem("userPassword")};

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    if(this.responseText == "true"){
        window.location.replace('summary.html');
	}
	else if(this.responseText == "false")
		document.getElementById("login_response").innerHTML = "Wrong ID or Password!";
  }
};

xmlhttp.open("POST", "http://localhost:3000/login", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify(login_credentials));
}