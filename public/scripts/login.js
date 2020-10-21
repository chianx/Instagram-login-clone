

var username = document.getElementById("user").value;
var password = document.getElementById("pass").value;

$(".show").on("click", function() {
    const type = pass.getAttribute("type") === 'password' ? 'text' : 'password';
    pass.setAttribute("type", type);
});

$("#pass").focus(function() {
    document.getElementById("pswd").classList.add("grey-border");
});


$(document).ready(function() {
    $("#user").keyup(function() {
        username = this.value;
        if (username.length >0 && password.length>5) {
            document.querySelector(".log").classList.add("blue");
            $(".enable").prop("disabled", false);
        }
        else {
            document.querySelector(".log").classList.remove("blue");
            $(".enable").prop("disabled", true);
        }
    });
    $("#pass").keyup(function() {
        password = this.value;
        if (username.length >0 && password.length>5) {
            document.querySelector(".log").classList.add("blue");
            $(".enable").prop("disabled", false)
        }
        else {
            document.querySelector(".log").classList.remove("blue");
            $(".enable").prop("disabled", true); 
        }
        if(password.length >0) {
            document.querySelector(".show").classList.remove("hidden");
        }else {
            document.querySelector(".show").classList.add("hidden");
        }
    });

});


