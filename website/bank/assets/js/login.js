//using form to login
var apiMachine = window.location.protocol + "//" + window.location.hostname + ":" + 3000 + '/api';

function ConvertFormToJSON(form) {
  var array = jQuery(form).serializeArray();
  var json = {};

  jQuery.each(array, function () {
    json[this.name] = this.value || "";
  });

  return json;
}


$(function () {

  var form = $("#loginForm");

  $(form).submit(function (event) {
    event.preventDefault();

    $.ajax({
      type: "POST",
      data: JSON.stringify(ConvertFormToJSON(form)),
      url: apiMachine + '/login',
      async: true,
      contentType: "application/json; charset=utf-8",
      dataType: "text",
      success: function (data) {
        if (data) {
          sessionStorage.setItem("token",data);
          window.location.replace('summary.html');
        } else
          document.getElementById("login_response").innerHTML = "Wrong ID or Password!";
      }
    });
  });
});