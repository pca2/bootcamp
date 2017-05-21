//Adding a hardcoded paragraph is all fine and good, but that's not really anything that HTML can't already do.
//Instead we'll write a couple of function that return a greeting based on what time of day it actually is
var getGreeting = function(){
  var d = new Date();
    var hour = d.getHours();
    if (hour < 12){
        return "Good Morning"
    } else if (hour >= 12 && hour <= 20 ) {
        return "Good Afternoon"
    } else {
        return "Good Evening"    
    }
}

var setGreeting = function(){
  var p = document.createElement("p");
  p.innerHTML = getGreeting();
  document.body.appendChild(p);
}
