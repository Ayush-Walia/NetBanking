$(document).ready(function() {

    var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000;

    var account = JSON.parse(sessionStorage.getItem("userInfo")).account_accountNumber;
    var formData = { account : account }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){
        var res = JSON.parse(this.responseText);
        var el = $("<tr></tr>");
        $("#send").append(el);
        for(var i=0;i<res.length;i++)
        {
            el.append('<td>'+res[i].paymentId+'</td>');
            el.append('<td>'+res[i].paymentTitle+'</td>');
            el.append('<td>'+res[i].paymentAmount+'</td>');
            el.append('<td>'+res[i].paymentDate+'</td>');
            el.append('<td>'+res[i].recieverAccountId+'</td>');

            el = $("<tr></tr>");
            $("#send").append(el);
        }
      }
    };
    
    xmlhttp.open("POST", apiMachine + "/getSend", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(formData));

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){
        var res = JSON.parse(this.responseText);
        var el = $("<tr></tr>");
        $("#rec").append(el);
        for(var i=0;i<res.length;i++)
        {
            el.append('<td>'+res[i].paymentId+'</td>');
            el.append('<td>'+res[i].paymentTitle+'</td>');
            el.append('<td>'+res[i].paymentAmount+'</td>');
            el.append('<td>'+res[i].paymentDate+'</td>');
            el.append('<td>'+res[i].account_accountNumber+'</td>');

            el = $("<tr></tr>");
            $("#rec").append(el);
        }
      }
    };
    
    xmlhttp.open("POST", apiMachine + "/getRecieve", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(formData));
});