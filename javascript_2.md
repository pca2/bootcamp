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


One of the neat things that closures allow for is functions that create other functions, but with the same initial conditions for every new instance. Let's take a look


```javascript
var makeAdder = function(a) {
    var adder = function(b) {
    return a + b
  }
  return adder 
}


var add5 = makeAdder(5);
//the A parameter in the above code has been set to 5
//You can now pass any number to add5 and it will add 5 to it

add5(2);
> 7
add5(7);
> 12

var add10 = makeAdder(10);
//Now the A parameter has been set to 10.
//You can now pass any number to add10 and 10 will be added to it

add10(2);
> 12
add10(7);
> 17
```

Now that's neat and all, but maybe not the most practical example. Let's take a look at some instances where closures can be quick helpful.

Closures allow you to mimic some of the features of object-oriented languages that JS lacks on its own. for example, private methods. Let's take a look at an example:



```javascript
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};
```

This is very similiar to the other closures we saw above. MakeCounter defines an initial variable, privateCounter and an a function,changeBy, which has access to privateCounter. Instead of returning a single function as we saw earlier, it actually returns an object which contains 3 functions. Two of these functions call the ChangeBy function, and as a result have access to privateCounter through the magic of closure.

We can now create a new counter and use any of these methods:

```javascript
var counter1 = makeCounter();
counter1.value();
> 0
counter1.increment();
counter1.value();
> 1
```
We could then even create anoter counter if we wanted to, and it would not be affected be the first one, even though they both start with the same initial value

```javascript
var counter2 = makeCounter();
counter2.value();
> 0
counter2.decrement();
counter2.value();
> -1
counter1.value();
> 1
```

Notice of course that neither counter has direct access to that privateCounter variable, they have to go through the value function. Using closures in this way is sometimes known the _module pattern_.

>Closures are useful because they let you associate some data (the lexical environment) with a function that operates on that data. This has obvious parallels to object oriented programming, where objects allow us to associate some data (the object's properties) with one or more methods. Consequently, you can use a closure anywhere that you might normally use an object with only a single method.

-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
 

>In JavaScript, if you use the function keyword inside another function, you are creating a closure. In C and most other common languages, after a function returns, all the local variables are no longer accessible because the stack-frame is destroyed. In JavaScript, if you declare a function within another function, then the local variables can remain accessible after returning from the function you called...The magic is that in JavaScript a function reference also has a secret reference to the closure it was created in 

>In JavaScript, whenever you declare a function inside another function, the inside function(s) is/are recreated again each time the outside function is called

 -- https://stackoverflow.com/a/111111 

>A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time that the closure was created. 

-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures


