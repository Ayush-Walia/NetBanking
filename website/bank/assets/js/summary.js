var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000 + '/api';

if(document.getElementById("summaryPage")!=null){
getSummary();
getBalance();
}

function getSummary(){
  $.ajax({
    type: "GET",
    url: apiMachine + '/getUserName',
    async: true,
    headers: {
      token: sessionStorage.getItem("token"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    success: function (data) {
      document.getElementById("greetingMessage").innerHTML = "Hi,"+ data.userName+"!";
    }
  });
}

function getBalance(){
  $.ajax({
    type: "GET",
    url: apiMachine + '/getAccountBal',
    async: true,
    headers: {
      token: sessionStorage.getItem("token"),
    },
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    success: function (data) {
      document.getElementById("accountBalance").innerHTML = "Balance: ₹ "+ data.accountBalance+"/-";
    }
  });
};