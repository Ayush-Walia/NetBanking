var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
var userId = { userId : userInfo.userId};

getUserInfo();

var nameButtonSwitch = true;
var contactButtonSwitch = true;
var passwordButtonSwitch = true;
var addressButtonSwitch = true;
var userStateValue;
var newData;

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
    if(nameButtonSwitch==true){
      var nameValue = document.getElementById("name").innerHTML;
      var genderValue = document.getElementById("gender").innerHTML;
      var dobValue = document.getElementById("dob").innerHTML;
      $('#name').replaceWith(function(){
        return "<div class='group'><input id='name' type='text' placeholder='Name' value='"+nameValue+"' required><span class='bar'></span></div>"
      })
      $('#gender').replaceWith(function(){
        return "<div class='group'><input id='gender' type='text' placeholder='Gender' value='"+genderValue+"' required><span class='bar'></span></div>"
      })
      $('#dob').replaceWith(function(){
        return "<div class='group'><input id='dob' type='text' placeholder='Date of Birth' value='"+dobValue+"' required><span class='bar'></span></div>"
      })
      document.getElementById("nameEditButton").innerHTML="<strong>Save</strong>";
      nameButtonSwitch = false;
    }
    else{
      var isSubmmitable = true;
      if(document.getElementById("name").value==""){
        document.getElementsByClassName("name")[0].style="color:red";
        document.getElementsByClassName("name")[0].innerHTML="Name*";
        isSubmmitable = false;
      }
      if(document.getElementById("gender").value==""){
        document.getElementsByClassName("name")[1].style="color:red";
        document.getElementsByClassName("name")[1].innerHTML="Gender*";
        isSubmmitable = false;
      }
      if(document.getElementById("dob").value==""){
        document.getElementsByClassName("name")[2].style="color:red";
        document.getElementsByClassName("name")[2].innerHTML="Date of Birth*";
        isSubmmitable = false;
      }
      if(isSubmmitable==true){
      for(var i=0;i<3;i++)  
      document.getElementsByClassName("name")[i].style="color:black";
      document.getElementsByClassName("name")[0].innerHTML="Name:";  
      document.getElementsByClassName("name")[1].innerHTML="Gender:";
      document.getElementsByClassName("name")[2].innerHTML="Date of Birth:";
      newData = {
          userName: document.getElementById("name").value,
          userGender: document.getElementById("gender").value,
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
      $('#phoneNumber').replaceWith(function(){
        return "<div class='group'><input id='phoneNumber' type='number' value='"+phoneNumberValue+"' required><span class='bar'></span></div>"
      })
      document.getElementById("contactEditButton").innerHTML="<strong>Save</strong>";
      contactButtonSwitch = false;    
    }
    else{
      var isSubmmitable = true;
      if(document.getElementById("phoneNumber").value==""){
        document.getElementsByClassName("name")[3].style="color:red";
        document.getElementsByClassName("name")[3].innerHTML="Contact Number*";
        isSubmmitable = false;
      }
      if(isSubmmitable==true){
      document.getElementsByClassName("name")[3].style="color:black";
      document.getElementsByClassName("name")[3].innerHTML="Contact Number:";
      newData = {
        userPhoneNo: document.getElementById("phoneNumber").value
      };
      sendUpdatedInfo(newData);      
      $('#phoneNumber').replaceWith(function(){
        return "<p class='description' id='phoneNumber'>{phoneNo}</p>"
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
        document.getElementsByClassName("name")[4].style="color:red";
        document.getElementsByClassName("name")[4].innerHTML="Password*";
        isSubmmitable = false;
      }
      if(isSubmmitable==true){
      document.getElementsByClassName("name")[4].style="color:black";
      document.getElementsByClassName("name")[4].innerHTML="Password:";  
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
        document.getElementsByClassName("name")[5].style="color:red";
        document.getElementsByClassName("name")[5].innerHTML="Address*";
        isSubmmitable = false;
      }
      if(userStateValue.length>0 && document.getElementById("userState").value==""){
        document.getElementsByClassName("name")[5].style="color:red";
        document.getElementsByClassName("name")[5].innerHTML="Address*";
        isSubmmitable = false;
      }
      if(isSubmmitable==true){
      document.getElementsByClassName("name")[5].style="color:black";
      document.getElementsByClassName("name")[5].innerHTML="Address:";  
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

function sendUpdatedInfo(newData){
  newData["userId"]=userInfo.userId;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      updatePassword(this.responseText);
      if(this.responseText=="true"){
        location.reload();
      }
    }
  };  
  xmlhttp.open("POST", "http://localhost:3000/updateInfo", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(newData));	  
}