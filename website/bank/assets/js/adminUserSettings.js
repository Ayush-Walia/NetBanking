var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000;
var userId = { userId : sessionStorage.getItem("customerInfo")};

getUserInfo();
getAccountInfo(); 

var nameButtonSwitch = true;
var contactButtonSwitch = true;
var passwordButtonSwitch = true;
var addressButtonSwitch = true;
var accountButtonSwitch = true;
var branchButtonSwitch = true;
var userStateValue;
var newData;
var dobValue;

function getUserInfo(){	
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200){
  var res = JSON.parse(this.responseText.replace(/[\[\]]/g,''));
  var dob = new Date(res.userDOB);
  setDobValue(dob);
  document.getElementById("name").innerHTML = res.userName;
  document.getElementById("userId").innerHTML = res.userId;
  document.getElementById("gender").innerHTML = res.userGender;
  document.getElementById("dob").innerHTML = dob.getDate()+"-"+(dob.getMonth()+1)+"-"+dob.getFullYear();
  document.getElementById("userStreet").innerHTML = res.userStreet;
  document.getElementById("userCity").innerHTML = res.userCity;
  if(res.userState != undefined)
  document.getElementById("userState").innerHTML = res.userState;
  else
  document.getElementById("userState").innerHTML = "";
  document.getElementById("phoneNumber").innerHTML = res.userPhoneNo;
  document.getElementById("userEmail").innerHTML = res.userEmail;
  if(res.userAccountStatus == "blocked")
  document.getElementById("blockButton").innerHTML = "Unblock Account";
  else
  document.getElementById("blockButton").innerHTML = "Block Account";
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
    document.getElementById("cardNumber").innerHTML = res.cardNumber;
    document.getElementById("accountType").innerHTML = res.accountType;
    document.getElementById("branchLocation").innerHTML = res.accountBranchLocation;
    }
  };
  
  xmlhttp.open("POST", apiMachine + "/getAccountInfo", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(userId));	
}
function setDobValue(dob){
  dobValue=dob.getFullYear() + "-" + ("0"+(dob.getMonth()+1)).slice(-2) + "-" + dob.getDate();
}

function editName(){
    if(nameButtonSwitch==true){
      var nameValue = document.getElementById("name").innerHTML;
      var genderValue = document.getElementById("gender").innerHTML;
      $('#name').replaceWith(function(){
        return "<div class='group'><input id='name' type='text' placeholder='Name' value='"+nameValue+"' required><span class='bar'></span></div>"
      })
      $('#gender').replaceWith(function(){
        return "<div class='group'><select id='gender'><option>Male</option><option>Female</option><option>Other</option></select></div>"
      })
      $('#dob').replaceWith(function(){
        return "<div class='group'><input id='dob' type='date' value='"+dobValue+"' placeholder='Date of Birth' required><span class='bar'></span></div>"
      })
      if(genderValue=="Male")
      document.getElementById("gender").selectedIndex="0";
      else if(genderValue=="Female")
      document.getElementById("gender").selectedIndex="1";
      else
      document.getElementById("gender").selectedIndex="2";
      document.getElementById("nameEditButton").innerHTML="<strong>Save</strong>";
      nameButtonSwitch = false;
    }
    else{
      var gender = document.getElementById("gender");
      var isSubmmitable = true;
      if(document.getElementById("name").value==""){
        document.getElementsByClassName("name")[0].style="color:red";
        document.getElementsByClassName("name")[0].innerHTML="Name*";
        isSubmmitable = false;
      }
      if(isSubmmitable==true){
      document.getElementsByClassName("name")[0].style="color:black";
      document.getElementsByClassName("name")[0].innerHTML="Name:";  
      newData = {
          userName: document.getElementById("name").value,
          userGender: gender.options[gender.selectedIndex].value,
          userDOB : document.getElementById("dob").value
      };
      sendUpdatedInfo(newData);
      $('#name').replaceWith(function(){
        return "<p class='description' id='name'>{name}</p>"
      })
      $('#gender').replaceWith(function(){
        return "<p class='description' id='gender'>{gender}</p>"
      })
      $('#dob').replaceWith(function(){
        return "<p class='description' id='dob'>{dob}</p> "
      })
      document.getElementById("nameEditButton").innerHTML="<strong>Edit</strong>";      
      nameButtonSwitch = true;
      }  
    }  
}

function editContact(){
    if(contactButtonSwitch==true){
      var phoneNumberValue = document.getElementById("phoneNumber").innerHTML;
      var emailValue = document.getElementById("userEmail").innerHTML;
      $('#phoneNumber').replaceWith(function(){
        return "<div class='group'><input id='phoneNumber' type='number' value='"+phoneNumberValue+"' required><span class='bar'></span></div>"
      })
      $('#userEmail').replaceWith(function(){
        return "<div class='group'><input id='userEmail' type='email' value='"+emailValue+"' required><span class='bar'></span></div>"
      })
      document.getElementById("contactEditButton").innerHTML="<strong>Save</strong>";
      contactButtonSwitch = false;    
    }
    else{
      var isSubmmitable = true;
      var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(document.getElementById("phoneNumber").value==""){
        document.getElementsByClassName("name")[7].style="color:red";
        document.getElementsByClassName("name")[7].innerHTML="Contact Number*";
        isSubmmitable = false;
      }
      else{
        document.getElementsByClassName("name")[7].style="color:black";
        document.getElementsByClassName("name")[7].innerHTML="Contact Number:";
      }
      if(document.getElementById("phoneNumber").value.length!=10){
        document.getElementsByClassName("name")[7].style="color:red";
        document.getElementsByClassName("name")[7].innerHTML="Contact Number*";
        document.getElementById("contactErrors").innerHTML="Phone number should be 10 digits long!";
        document.getElementById("contactErrors").style="color:red";
        isSubmmitable = false;
      }
      else{
        document.getElementById("contactErrors").innerHTML="";
        document.getElementsByClassName("name")[7].style="color:black";
        document.getElementsByClassName("name")[7].innerHTML="Contact Number:";
      }
      if(document.getElementById("userEmail").value=="" || pattern.test(document.getElementById("userEmail").value)==false){
        document.getElementsByClassName("name")[8].style="color:red";
        document.getElementsByClassName("name")[8].innerHTML="Email*";
        document.getElementById("emailErrors").innerHTML="Enter a valid Email!";
        document.getElementById("emailErrors").style="color:red";
        isSubmmitable = false;
      }
      else{
        document.getElementById("emailErrors").innerHTML="";
        document.getElementsByClassName("name")[8].style="color:black";
        document.getElementsByClassName("name")[8].innerHTML="Email";
      }
      if(isSubmmitable==true){
      newData = {
        userPhoneNo: document.getElementById("phoneNumber").value,
        userEmail : document.getElementById("userEmail").value
      };
      sendUpdatedInfo(newData);      
      $('#phoneNumber').replaceWith(function(){
        return "<p class='description' id='phoneNumber'>{phoneNo}</p>"
      })
      $('#userEmail').replaceWith(function(){
        return "<p class='description' id='userEmail'>{email}</p>"
      })
      document.getElementById("contactEditButton").innerHTML="<strong>Edit</strong>";
      contactButtonSwitch = true;
    }
  }
}

function editPassword(){
    if(passwordButtonSwitch==true){
      $('#userPassword').replaceWith(function(){
        return "<div class='group'><input placeholder='Type old Password' id='userPassword' type='password' value='' required><span class='bar'></span></div>"
      })
      $('#newPassword').replaceWith(function(){
        return "<div class='group'><input placeholder='Type new Password' id='newPassword' type='password' value='' required><span class='bar'></span></div>"
      })
      $('#newPasswordConfirm').replaceWith(function(){
        return "<div class='group'><input placeholder='Confirm new Password' id='newPasswordConfirm' type='password' value='' required><span class='bar'></span></div>"
      })            
      document.getElementById("passwordEditButton").innerHTML="<strong>Save</strong>";
      passwordButtonSwitch = false;    
    }
    else{
      var isSubmmitable = true;
      if(document.getElementById("userPassword").value=="" || document.getElementById("newPassword").value=="" || document.getElementById("newPasswordConfirm").value==""){
        document.getElementsByClassName("name")[3].style="color:red";
        document.getElementsByClassName("name")[3].innerHTML="Password*";
        isSubmmitable = false;
      }
      var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if(pattern.test(document.getElementById("newPassword").value)==false){
        document.getElementById("passwordErrors").innerHTML="New password must contain lower case, upper case, <br>special character, number and must be longer than 8 digits!";
        document.getElementById("passwordErrors").style="color:red";
        isSubmmitable=false;
      }
      if(isSubmmitable==true){
      document.getElementsByClassName("name")[3].style="color:black";
      document.getElementsByClassName("name")[3].innerHTML="Password:";  
      newData = {
        userPassword: document.getElementById("userPassword").value,
        newPassword: document.getElementById("newPassword").value
      };
      if(document.getElementById("newPassword").value==document.getElementById("newPasswordConfirm").value){
      sendUpdatedInfo(newData);
      }
      else{
        document.getElementById("passwordErrors").innerHTML="Password should be same!";
        document.getElementById("passwordErrors").style="color:red";
      }
      }    
    }
}

function updatePassword(passwordChanged){
  if(passwordChanged=="0"){
    document.getElementById("passwordErrors").innerHTML="Old password is wrong!";
    document.getElementById("passwordErrors").style="color:red";
  }
  else if(passwordChanged=="1"){
  document.getElementById("passwordErrors").innerHTML="Password Changed Successfully!";
  document.getElementById("passwordErrors").style="color:green";
  $('#userPassword').replaceWith(function(){
    return "<p class='description' id='userPassword'>**************</p>"
  })
  $('#newPassword').replaceWith(function(){
    return "<p id='newPassword'></p>"
  })
  $('#newPasswordConfirm').replaceWith(function(){
    return "<p id='newPasswordConfirm'></p>"
  })
  document.getElementById("passwordEditButton").innerHTML="<strong>Edit</strong>";
  passwordButtonSwitch = true;
  }
}

function editAddress(){ 
    if(addressButtonSwitch==true){
      var userStreetValue = document.getElementById("userStreet").innerHTML;
      var userCityValue = document.getElementById("userCity").innerHTML;
      userStateValue = document.getElementById("userState").innerHTML; 
      $('#userStreet').replaceWith(function(){
        return "<div class='group'><input id='userStreet' type='text' value='"+userStreetValue+"' required><span class='bar'></span></div>"
      })
      $('#userCity').replaceWith(function(){
        return "<div class='group'><input id='userCity' type='text' value='"+userCityValue+"' required><span class='bar'></span></div>"
      })
      if(userStateValue.length>0)
        $('#userState').replaceWith(function(){
          return "<div class='group'><input id='userState' type='text' value='"+userStateValue+"' required><span class='bar'></span></div>"
        })
      document.getElementById("addressEditButton").innerHTML="<strong>Save</strong>";
      addressButtonSwitch = false;
  }
  else{
      var isSubmmitable = true;
      if(document.getElementById("userStreet").value=="" || document.getElementById("userCity").value==""){
        document.getElementsByClassName("name")[9].style="color:red";
        document.getElementsByClassName("name")[9].innerHTML="Address*";
        isSubmmitable = false;
      }
      if(userStateValue.length>0 && document.getElementById("userState").value==""){
        document.getElementsByClassName("name")[9].style="color:red";
        document.getElementsByClassName("name")[9].innerHTML="Address*";
        isSubmmitable = false;
      }
      if(isSubmmitable==true){
      document.getElementsByClassName("name")[9].style="color:black";
      document.getElementsByClassName("name")[9].innerHTML="Address:";  
      newData = {
        userStreet: document.getElementById("userStreet").value,
        userCity: document.getElementById("userCity").value,
        userState: document.getElementById("userState").value
      };
      sendUpdatedInfo(newData);  
      $('#userStreet').replaceWith(function(){
        return "<p class='description' id='userStreet'>{userStreet}</p>"
      })
      $('#userCity').replaceWith(function(){
        return "<p class='description' id='userCity'>{userCity}</p>"
      })
      if(userStateValue.length>0){
        $('#userState').replaceWith(function(){
          return "<p class='description' id='userState'>{userState}</p>"
        })
      }
      document.getElementById("addressEditButton").innerHTML="<strong>Edit</strong>";
      addressButtonSwitch = true;
    }  
  }
}

function editAccount(){
  if(accountButtonSwitch==true){
    var userIdValue = document.getElementById("userId").innerHTML;
    var accountNumberValue = document.getElementById("accountNumber").innerHTML;
    var accountTypeValue = document.getElementById("accountType").innerHTML;
    $('#userId').replaceWith(function(){
      return "<div class='group'><input id='userId' type='number' placeholder='User ID' value='"+userIdValue+"' required><span class='bar'></span></div>"
    })
    $('#accountType').replaceWith(function(){
      return "<div class='group'><select id='accountType'><option>Current</option><option>Savings</option></select></div>"
    })
    $('#accountNumber').replaceWith(function(){
      return "<div class='group'><input id='accountNumber' type='number' value='"+accountNumberValue+"' placeholder='Account Number' readonly><span class='bar'></span></div>"
    })
    if(accountTypeValue=="Current")
    document.getElementById("accountType").selectedIndex="0";
    else if(accountTypeValue=="Savings")
    document.getElementById("accountType").selectedIndex="1";
    document.getElementById("accountEditButton").innerHTML="<strong>Save</strong>";
    accountButtonSwitch = false;
  }
  else{
    var accountType = document.getElementById("accountType");
    var isSubmmitable = true;
    if(document.getElementById("userId").value==""){
      document.getElementsByClassName("name")[4].style="color:red";
      document.getElementsByClassName("name")[4].innerHTML="User ID*";
      isSubmmitable = false;
    }
    else{
      document.getElementsByClassName("name")[4].style="color:black";
      document.getElementsByClassName("name")[4].innerHTML="User ID";
      isSubmmitable = true;      
    }
    if(document.getElementById("accountNumber").value==""){
      document.getElementsByClassName("name")[5].style="color:red";
      document.getElementsByClassName("name")[5].innerHTML="Account Number*";
      isSubmmitable = false;
    }
    else{
      document.getElementsByClassName("name")[5].style="color:black";
      document.getElementsByClassName("name")[5].innerHTML="Account Number";
      isSubmmitable = true;      
    }    
    if(isSubmmitable==true){
    newData = {
        newuserId: document.getElementById("userId").value,
        accountType: accountType.options[accountType.selectedIndex].value
    };
    sendUpdatedInfo(newData);
    sessionStorage.setItem("customerInfo", document.getElementById("userId").value);
    $('#userId').replaceWith(function(){
      return "<p class='description' id='userId'>{userId}</p>"
    })
    $('#accountNumber').replaceWith(function(){
      return "<p class='description' id='accountNumber'>{accountNo}</p>"
    })
    $('#accountType').replaceWith(function(){
      return "<p class='description' id='accountType'>{accountType}</p> "
    })
    document.getElementById("accountEditButton").innerHTML="<strong>Edit</strong>";      
    accountButtonSwitch = true;
    }  
  }  
}

function editBranch(){
  if(branchButtonSwitch==true){
    var branchLocationValue = document.getElementById("branchLocation").innerHTML;
    var cardNumberValue = document.getElementById("cardNumber").innerHTML;
    $('#branchLocation').replaceWith(function(){
      return "<div class='group'><input id='branchLocation' type='text' placeholder='Branch Location' value='"+branchLocationValue+"' required><span class='bar'></span></div>"
    })
    $('#cardNumber').replaceWith(function(){
      return "<div class='group'><input id='cardNumber' type='number' value='"+cardNumberValue+"' placeholder='Card Number' required><span class='bar'></span></div>"
    })
    document.getElementById("branchEditButton").innerHTML="<strong>Save</strong>";
    branchButtonSwitch = false;
  }
  else{
    var isSubmmitable = true;
    if(document.getElementById("branchLocation").value==""){
      document.getElementsByClassName("name")[10].style="color:red";
      document.getElementsByClassName("name")[10].innerHTML="Branch location*";
      isSubmmitable = false;
    }
    else{
      document.getElementsByClassName("name")[10].style="color:black";
      document.getElementsByClassName("name")[10].innerHTML="Branch location";
      isSubmmitable = true;      
    }
    if(document.getElementById("cardNumber").value==""){
      document.getElementsByClassName("name")[11].style="color:red";
      document.getElementsByClassName("name")[11].innerHTML="Card Number*";
      isSubmmitable = false;
    }
    else{
      document.getElementsByClassName("name")[11].style="color:black";
      document.getElementsByClassName("name")[11].innerHTML="Card Number";
      isSubmmitable = true;      
    }    
    if(isSubmmitable==true){
    newData = {
        newuserId: document.getElementById("userId").value,
        accountBranchLocation: document.getElementById("branchLocation").value,
        cardNumber : document.getElementById("cardNumber").value
    };
    sendUpdatedInfo(newData);
    $('#branchLocation').replaceWith(function(){
      return "<p class='description' id='branchLocation'>{branchLocation}</p>"
    })
    $('#cardNumber').replaceWith(function(){
      return "<p class='description' id='cardNumber'>{cardNumber}</p> "
    })
    document.getElementById("branchEditButton").innerHTML="<strong>Edit</strong>";      
    branchButtonSwitch = true;
    }  
  }  
}

function changeAccountStatus(status){
  if(status=='block-toggle'){
    if(document.getElementById("blockButton").innerHTML=="Block Account")
    status = "blocked";
    else
    status = "";
  }
  newData = {
    userAccountStatus : status
  }
  sendUpdatedInfo(newData);
}

function sendUpdatedInfo(newData){
  newData["userId"]=userId.userId;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      updatePassword(this.responseText);
      if(this.responseText=="true"){
        location.reload();
      }
    }
  };  
  xmlhttp.open("POST", apiMachine + "/updateInfo", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(newData));	  
}
