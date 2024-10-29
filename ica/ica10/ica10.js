let my_var = 100;
var my_other_var = "hello world";
const this_is_a_constant = "constant";
console.log(my_other_var);
my_other_var += "!";

console.log(document.getElementById("my_head"));
document.getElementById("my_head").addEventListener("click", function(e){
    alert("You Fool...");
    document.getElementById("paragraph").innerHTML = "Joe Mama"
    document.getElementById("paragraph").style.color = "red"
    document.getElementById("image").src = "2.jpg"
})

console.log(document.getElementById("my_head").innerHTML);