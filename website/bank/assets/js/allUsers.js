$(document).ready(function() {

    var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000;

    var userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){
        var res = JSON.parse(this.responseText);
        var count = 0;
        var el = $("<tr></tr>");
        $("#usersList").append(el);
        for(var i=0;i<res.length;i++)
        {
            if(res[i].userType == "admin")
              continue;
            el.append('<td>'+(++count)+'</td>');
            el.append('<td>'+res[i].userName+'</td>');
            el.append('<td>'+res[i].accountNumber+'</td>');
            el.append('<td>'+"₹ "+res[i].accountBalance+"/-"+'</td>');
            el.append('<td>'+"<button class='btn btn-primary' onclick='sessionStorage.setItem(\"customerInfo\","+res[i].userId+");window.location.href=\"adminUserSettings.html\"' style='background-color:rgb(21,99,190);'>View Details</button>"+'</td>');

            el = $("<tr></tr>");
            $("#usersList").append(el);
        }
      }
    };
    
    xmlhttp.open("POST", apiMachine + "/getAllUsers", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
});