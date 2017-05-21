// Because this is a single unit of code, we'll wrap it into a function so that we can easily call it when we want it
var addGreeting = function() {
  var p = document.createElement("p");
  p.innerHTML = "I'm a paragraph that was created by javascript";
  document.body.appendChild(p);
}
