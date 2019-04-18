if(document.getElementById("transferMoneyPage")!=null){
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

function sendMoney(){
var isSummitable = true;
if(document.getElementById("raccount").value==""){
  document.getElementsByTagName("label")[0].style="color:red;";
  document.getElementsByTagName("label")[0].innerHTML="Account Number*";
  isSummitable = false;
}

if(document.getElementById("amount").value==""){
  document.getElementsByTagName("label")[1].style="color:red;";
  document.getElementsByTagName("label")[1].innerHTML="Amount*";
  isSummitable = false;
}

if(isSummitable==true){
  document.getElementsByTagName("label")[0].style="color:#999;";
  document.getElementsByTagName("label")[0].innerHTML="Account Number";
  document.getElementsByTagName("label")[1].style="color:#999;";
  document.getElementsByTagName("label")[1].innerHTML="Amount";
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
      if(this.responseText=="true"){
        document.getElementById("payment_response").style="color:green;text-align: center;";
        document.getElementById("payment_response").innerHTML="Payment Successful!";
        document.getElementById("raccount").value="";
        document.getElementById("amount").value="";
        document.getElementById("title").value="";
      }
      else{
        document.getElementById("payment_response").style="color:red;text-align: center;";
        document.getElementById("payment_response").innerHTML=this.responseText;
      }
    }
  };
  
  xmlhttp.open("POST", apiMachine + "/sendMoney", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(formData));
 }
}
}