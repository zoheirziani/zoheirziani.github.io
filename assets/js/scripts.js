function change() {
    var x = document.getElementById("name");
    x.value = x.value.toUpperCase();
}

function validate() {
    var n1 = document.getElementById("name");
    var n2 = document.getElementById("email");
    if(n1.value !="" && n2.value != ""){
        return true;
    }
    alert("You should give your name and your email");
    return false;
}
