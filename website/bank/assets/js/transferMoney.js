//using form to login
var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000;

function ConvertFormToJSON(form) {
  var array = jQuery(form).serializeArray();
  var json = {};

  jQuery.each(array, function () {
    json[this.name] = this.value || "";
  });

  return json;
}


function sendMoney() {
  var raccount = $("#raccount").val();
  var title = $("#title").val();
  var amount = $("#amount").val();
  var saccount = JSON.parse(sessionStorage.getItem("userInfo")).account_accountNumber;

  var formData = {
    "raccount": raccount,
    "title": title,
    "saccount": saccount,
    "amount": amount
  }
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
    }
  };
  
  xmlhttp.open("POST", apiMachine + "/sendMoney", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(formData));
}