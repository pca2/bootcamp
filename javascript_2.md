## Closure

As you should be aware, JS has functional scope for variables defined with `var`. Variables are scoped to the function they are defined in, and the Global frame if not defined inside a function. Nested functions always have access to outer layers, but outer layers never have access to inner layers.

```javascript
function funcOne() {
    var myString = "This string is defined inside funcOne";
    function writeString() {
        console.log(myString)
    }
    writeString();
}

funcOne();
```

The above code will return:
`"This string is defined inside funcOne"`

This is nothing you haven't seen before, but let's review what happens here because we're then going to build on this basic example:

1. funcOne defines a variable, myString, and a function, writeString.
2. funcOne then calls the writeString.
3. writeString simply logs the vaiable myString. Note that writeString has access to myString thanks to JS's lexical scoping. WriteString doesn't define the variable nor is it passed in as a parameter.


```javascript
function funcOne() {
	var myString = "This string is defined inside funcOne";
	function writeString() {
			console.log(myString)
	}
	return writeString;
}

var myFunc = funcOne();
myFunc();
```

Okay, so almost the same code as before, but now instead of funcOne defining and then running writeString, it now defines it and returns the function itself. That means when we define myFunc as the result of funcOne(), we're essentially defining myFunc as the writeString nested function. Just as in the first example, writeString has access to the myString variable, but so does myFunc. 

The key thing to understand here is that when a function returns another function that is nested inside of it, you're not only returning the nested function, you're returning the context in which the nested function was defined. This is what's know as a closure. This is possible in JS because functions are _first-class objects_.

#Adder example


>In JavaScript, if you use the function keyword inside another function, you are creating a closure. In C and most other common languages, after a function returns, all the local variables are no longer accessible because the stack-frame is destroyed. In JavaScript, if you declare a function within another function, then the local variables can remain accessible after returning from the function you called...The magic is that in JavaScript a function reference also has a secret reference to the closure it was created in 

>In JavaScript, whenever you declare a function inside another function, the inside function(s) is/are recreated again each time the outside function is called

 -- https://stackoverflow.com/a/111111 

