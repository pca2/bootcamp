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
var p = document.createElement("p");
p.innerHTML = getGreeting();
document.body.appendChild(p);
// Note: This code is for demonstration purposes. Don't use it in production