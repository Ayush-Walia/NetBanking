var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
var userId = { userId : userInfo.userId};

if(document.getElementById("settingsPage")!=null){
getUserInfo();
}

var nameEditable = true;
var contactEditable = true;
var passwordEditable = true;
var addressEditable = true;

function getUserInfo(){	
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200){
	var res = JSON.parse(this.responseText.replace(/[\[\]]/g,''));
    document.getElementById("name").innerHTML = res.userName;
	document.getElementById("gender").innerHTML = res.userGender;
	document.getElementById("dob").innerHTML = res.userDOB;
	document.getElementById("userStreet").innerHTML = res.userStreet;
	document.getElementById("userCity").innerHTML = res.userCity;
	document.getElementById("userState").innerHTML = res.userState;
	document.getElementById("phoneNumber").innerHTML = res.userPhoneNo;
  }
};

xmlhttp.open("POST", "http://localhost:3000/getUserInfo", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify(userId));	
}

function editName(){
    if(nameEditable==true){
    var nameValue = document.getElementById("name").innerHTML;
    var genderValue = document.getElementById("gender").innerHTML;
    var dobValue = document.getElementById("dob").innerHTML;
    document.getElementById("name").innerHTML="<input type='text' value='"+nameValue+"'></span><span class='bar'></span>";
    document.getElementById("gender").innerHTML="<input type='text' value='"+genderValue+"'></span><span class='bar'></span>";
    document.getElementById("dob").innerHTML="<input type='text' value='"+dobValue+"'></span><span class='bar'></span>"; 
    nameEditable = false;
    }
}

function editContact(){
    if(contactEditable==true){
    var phoneNumberValue = document.getElementById("phoneNumber").innerHTML;
    document.getElementById("phoneNumber").innerHTML="<input type='text' value='"+phoneNumberValue+"'></span><span class='bar'></span>";
    contactEditable = false;    
    }
}

function editPassword(){
    if(passwordEditable==true){
    document.getElementById("userPassword").innerHTML="<input placeholder='Type old Password' type='text' value=''></span><span class='bar'></span>";
    document.getElementById("newPassword").innerHTML="<input placeholder='Type new Password' type='text' value=''></span><span class='bar'></span>";
    document.getElementById("newPasswordConfirm").innerHTML="<input placeholder='Confirm new Password' type='text' value=''></span><span class='bar'></span>";
    passwordEditable = false;    
    }
}

function editAddress(){
    if(addressEditable==true){
    var userStreetValue = document.getElementById("userStreet").innerHTML;
    var userCityValue = document.getElementById("userCity").innerHTML;
    var userStateValue = document.getElementById("userState").innerHTML;
    document.getElementById("userStreet").innerHTML="<input type='text' value='"+userStreetValue+"'></span><span class='bar'></span>";
    document.getElementById("userCity").innerHTML="<input type='text' value='"+userCityValue+"'></span><span class='bar'></span>";
    if(userStateValue.length>0){
    document.getElementById("userState").innerHTML="<input type='text' value='"+userStateValue+"'></span><span class='bar'></span>";
    addressEditable = false;
        }
    }
}