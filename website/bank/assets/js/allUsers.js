$(document).ready(function() {

    var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000;

    var userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
    var formData = { userId : userId }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){
        var res = JSON.parse(this.responseText);
        var el = $("<tr></tr>");
        $("#usersList").append(el);
        for(var i=0;i<res.length;i++)
        {
            el.append('<td>'+(i+1)+'</td>');
            el.append('<td>'+res[i].userName+'</td>');
            el.append('<td>'+res[i].account_accountNumber+'</td>');
            el.append('<td>'+"₹ "+res[i].accountBalance+"/-"+'</td>');
            el.append('<td>'+"<button class='btn btn-primary' style='background-color:rgb(21,99,190);'>View Details</button>"+'</td>');

            el = $("<tr></tr>");
            $("#usersList").append(el);
        }
      }
    };
    
    xmlhttp.open("POST", apiMachine + "/getAllUsers", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
});