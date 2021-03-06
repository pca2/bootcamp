# Final Proposed outline for 2
```
## Let and Const Variables
## Closure
## this keyword and constructor functions
## Inheritance/Prototypes
### Classical vs. Prototypal Inheritance
  - Constructor pattern. Reveal that all objects made with constructors have their __proto__ set
  - Then introduce class pattern as sugar over the constructor pattern
## Spread Operator (ES6)
## Immediately Invoked Function Expression (IIFE)
## callbacks, promises and hell
```


## Closure

As you should be aware, JS has functional scope for variables defined with `var`. Variables are scoped to the function they are defined in, and if they're not defined inside a function, they're scoped to the global frame. Nested functions always have access to outer layers, but outer layers never have access to inner layers.

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

1. `funcOne` defines a variable, `myString`, and a function, `writeString`.
2. `funcOne` then calls the `writeString` function.
3. `writeString` simply logs the `variable` myString. Note that `writeString` has access to `myString` automatically thanks to JS's lexical scoping. `WriteString` doesn't define the variable nor is it passed in as a parameter.


Let's change to code block above slightly to make use of closure:

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

Okay, so almost the same code as before, but now instead of `funcOne` defining and then running `writeString`, it now defines it and _returns_ the function itself. That means when we define `myFunc` as the result of `funcOne()`, we're essentially defining `myFunc` as the `writeString` nested function. Just as in the first example, `writeString` has access to the `myString` variable, but so does `myFunc`. 

The key thing to understand here is that when a function returns another function that is nested inside of it, you're not only returning the nested function, you're returning the __context in which the nested function was defined__. This is what's know as a closure. This is possible in JS because functions are _first-class objects_.


One of the neat things that closures makes possible is functions that create other functions, but with the same initial conditions for every new instance. Let's take a look.

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
Now that's neat and all, but maybe not the most practical example. Let's take a look at some instances where closures can be quite helpful.

Closures allow you to mimic some of the features of object-oriented languages that JS lacks on its own. for example, private values. Let's take a look at an example:

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

This is very similiar to the other closures we saw above. `MakeCounter` defines an initial variable, `privateCounter` and a function, `changeBy`, which has access to `privateCounter`. Instead of returning a single function as we saw earlier, it actually returns an object which contains 3 functions. Two of these functions call the `ChangeBy` function, and as a result have access to `privateCounter` through the magic of closure.

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

TK -- excercise 

>Closures are useful because they let you associate some data (the lexical environment) with a function that operates on that data. This has obvious parallels to object oriented programming, where objects allow us to associate some data (the object's properties) with one or more methods. Consequently, you can use a closure anywhere that you might normally use an object with only a single method.

-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
 

>In JavaScript, if you use the function keyword inside another function, you are creating a closure. In C and most other common languages, after a function returns, all the local variables are no longer accessible because the stack-frame is destroyed. In JavaScript, if you declare a function within another function, then the local variables can remain accessible after returning from the function you called...The magic is that in JavaScript a function reference also has a secret reference to the closure it was created in 

>In JavaScript, whenever you declare a function inside another function, the inside function(s) is/are recreated again each time the outside function is called

 -- https://stackoverflow.com/a/111111 

>A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time that the closure was created. 

-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures


## Let and Const Variables

So far you've always been declaring variables with the `var` keyword, but there's actually other ways do define variables too, `let` and `const`

First let's do a quick review of `var`. Two of the key properties of variables defined with var are that:

1. They are scoped to the function in which they are declared, or if there is no function, the global frame.
2. They are hoisted at compile time, meaning that they are allocated in memory as soon as the script loads.

Here's an example:

```javascript
console.log("before the block myVar equals " + myVar);
if (1 < 2){
  var myVar = "this is a var variable declared inside an if block";
  console.log("inside the block myVar equals " + myVar);

}
console.log("after the if block myVar equals " + myVar);
```

This code will log the following:

```
before the block myVar equals undefined
inside the block myVar equals this is a var variable declared inside an if block
after the if block myVar equals this is a var variable declared inside an if block
```

### let 

You can also define variables using the keyword `let` instead of `var`. Here's how `let` variables differ:

1. Thy are scoped to the __block__ in which they are declared. In addition to functions, this includes things like if statements and while/for loops.
2. They are __not hoisted__ meaning that they do not exist in memory in any way until the interpreter gets to the line on which they are defined. 


Let's look at what happens if you swap out `var myVar` with `let myLet` in the code from above:

```javascript
console.log("before the block myLet equals " + myLet);
if (1 < 2){
    let myLet = "this is a let variable declared inside an if block";
    console.log("inside the block myLet equals " + myLet);
}
console.log("after the if block myLet equals " + myLet);
```

Because let variables are not hoisted, this code chunk will actually error on the first line and not continue:

```javascript
Uncaught ReferenceError: myLet is not defined
```

if we skip that first line though we get this:

```javascript
inside the block myLet equals this is a let variable declared inside an if block
Script snippet #1:6 Uncaught ReferenceError: myLet is not defined
```

So as you can see, the `myLet` only existed in the if block. Unlike a `var` variable, it doesn't exist in any form outside of this block.

In the right circumstances, `let` has several advantages over `var`, most notably performance. Because `let` variables are cleaned up after their block completes, they're no longer sitting around taking up memory. They're also great for temporary variables such as in loops, and allow for cleaner code. Consider the following:


```javascript
var array = [1,2,3];

for (var i = 0; i < array.length; i += 1) {
  console.log(array[i]);
}

console.log("i is still equal to " + i);
```

Output:
```
1
2
3
i is still equal to 3
```

We don't think about it, but `i` is still there in memory after the loop completes, taking up space, and possibly colluding with other loops. If we define `i` with `let` instead, it will be cleaned up as soon as the loop is over:


```javascript
var array = [1,2,3];

for (let i = 0; i < array.length; i += 1) {
  console.log(array[i]);
}

console.log("i is still equal to " + i);
```

Output:
```
1
2
3
ReferenceError: i is not defined
```

This can be especially helpful if you have multpile loops going at once. 

### const

Variables defined with `const` are very similiar to `let` variables.

1. Thy are scoped to the __block__ in which they are declared. In addition to functions, this includes things like if statements and while/for loops.
2. They are __not hoisted__ meaning that they do not exist in memory in any way until the interpreter gets to the line on which they are defined. 

Plus a third rule:
3. Variables defined with `const` will throw an error if you attempt to re-define them.


```javascript
const name = "Ralph";
console.log("In the global frame the name is " + name);
if (1 < 2){
  const name = "Sam";
  console.log("In this block name is " + name);
}
console.log("Back in the global frame the name is " + name);
const name = "Another name";
```

Output:
```
In the global frame the name is Ralph
In this block name is Sam
Back in the global frame the name is Ralph
SyntaxError: Identifier 'name' has already been declared
```

__Summary__

| Type | Scope | Hoisting | Other |
| --- | --- | --- | --- |
|var |function|hoisted|N/A |
|let | block |not hoisted|N/A |
|const|block|not hoisted| error if re-defined|


## callbacks, promises and hell

## this keyword and constructor functions

Let's say you create a new object, fido:
```javascript
var fido = {
  name: "fido",
  barkCount: 0     
};
```
You like having fido around so much you decide to create another very similiar object, lassie:
```javascript
var lassie = {
  name: "lassie",
  barkCount: 0     
};
```

This is great and all, but in practice, you probably don't want to be lovingly handmaking artisnal objects one-by-one; you want some automation. Fortunately we can create a single constructor function that will take care of that for us: 

```javascript
var Dog = function(name,barkCount) {
  this.name = name;
  this.barkCount = 0;
}
```

With this handy function we can create as many Dog-like obects as we want with:

```javascript
var fido = new Dog('fido',0);

console.log(fido);
> Dog {name:'fido', barkCount: 0}
```

So we've encountered the `this` keyword. It's a powerful idea that, like most things in Javascript, has a few quirks to it.

In Javascript `this` is a special keyword used inside functions to refer back to the object/context that invoked the function. Much like the actual English word, `this` can be thought of sort of like a programming pronoun. Instead of referring to another noun though, it refers to another object. This is especially helpful when you want to refer to an object that might not exist yet. 

Let's take a look again at that Dog function to see what I mean.

```javascript
var Dog = function(name,barkCount) {
  this.name = name;
  this.barkCount = 0;
}

var fido = new Dog('fido',0);
```
The `this` keyword acts as a placeholder. You're saying "whatever new object is created from running this constructor function, assign it a name property equal to the name parameter, and a barkCount property equal to the barkCount parameter". This is helpful because the new object doesn't actually exist yet.

Also don't forget the difference between parameters and properties in these examples. We use the same name for ease of understanding, but they're separate things:
```javascript
var Dog = function(fartz_parameter,buttz_parameter) {
  this.name = fartz_parameter;
  this.barkCount = buttz_parameter:
}
```

tk -- Excercise


The `this` keyword can also be helpful when assigning functions to an object: 

```javascript
var puppy = {
  name: "fido",
  barkCount: 0,
  bark: function(){
    this.barkCount += 1;
    console.log("barkcount is " + this.barkCount);
  }
}

puppy.bark();
> barkcount is 1
puppy.bark();
> barkcount is 2
```

**Invocation Rules**

In the above example, the `this` in the `bark` function refers to `puppy`, which is pretty straight forward. There are however instances when things can get complicated and it can be tough to figure out what object `this` is pointing to. Let's go over some examples. 

Just to review, let's look at two straight forward examples again:

Here the `this` in the `bark` function refers to the `fido` object:

```javascript
var fido = {
  name: "fido",
  barkCount: 0,
  bark: function(){
    this.barkCount += 1;
    console.log("barkcount is " + this.barkCount);
  }
}

fido.bark();
```

Here the `this` refers to the new `puppy` object that's created:
```javascript
var Dog = function(name,barkCount) {
  this.name = name;
  this.barkCount = barkCount:
}
var puppy = new Dog();
```

That's pretty cut and dry, but what happens when you create a new object that refers to an existing object's inner functions? 
Let's say for example that you want to create a new `fido_bark` function that refers back to the `fido.bark`:

```javascript
var fido = {
  name: "fido",
  barkCount: 0,
  bark: function(){
    this.barkCount += 1;
    console.log("barkcount is " + this.barkCount);
  }
}

var fido_bark = fido.bark;
fido_bark();
//TypeError: Cannot read property 'name' of undefined
```

What happens is that the `this` in the `fido.bark` function will refer to the next context "up". In this case it would be the the **Window** or **Global** object, which may not be what you want. 

> Even though it appears [the this keyword] refers to the object where it is defined, it is not until an object invokes the this Function that [the this keyword] is actually assigned a value. And the value it is assigned is based exclusively on the object that invokes the this Function. [In short, the this keyword] has the value of the invoking object. -- http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/

An easy way to think of it is that generally speaking, The `this` keyword only cares about how it is called, not how it was defined.

Fortunately you can work around this error if it comes up by manually specifing the context you want to be invoked with the `call` and `apply` functions:


```javascript
var fido = {
  name: "fido",
  barkCount: 0,
  bark: function(){
    this.barkCount += 1;
    console.log("barkcount is " + this.barkCount);
  }
}

var fido_bark = fido.bark;
fido_bark.call(fido);
> barkcount is 1
```

As you can see, we're manually telling the `bark` function that we want it to run with the context of `fido`, rather than `window`, which is what it would use by default.

If the `fido_bark` function took any parameters you could pass them in after the first object:


```javascript
fido_bark.call(fido,one_parameter,two_parameter);
```

`apply` works just like `call` except instead of passing in parameters one by one, you pass in a single parameter array:

```javascript
fido_bark.apply(fido,[one_parameter,two_parameter]);
```
TK:
- arrow functions
- bind

Bind is similar to call/apply. The difference is that with call/apply you're invoking the function immediately. Bind can be used to permanently set the context of a function ahead of time, for invocation later on:
```javascript
var fido = {
  name: "fido",
  bark: function () {
  console.log("My name is  " + this.name);
  }
}

var bingo = {
  name: "bingo"
}

fido.bark();
> "My name is fido"
fido.bark.call(bingo);
> "My name is bingo"
//using call invokes the bark function right away, but what if we want to define a function that can be called later on:
bingo.bark = fido.bark.bind(bingo);
bingo.bark();
> "my name is bingo"
//This technique is called "function borrowing"
```

tk - exercise 
This example is still kid of contrived, let's come up with a better example.

- closures?




>In most cases, the value of this is determined by how a function is called. It can't be set by assignment during execution, and it may be different each time the function is called -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this


## Inheritance/Prototypes

Before we get into any of the inheritance stuff I think it may be helpful to frame the purpose of general inheritance in programming. I've always found the following quote from Sandi Metz's _Practical Object-Oriented Design_ helpful:

> Inheritance is, at its core, a mechanism for automatic message delegation. It defines a forwarding path for not-understood messages. It creates relationships such that, if one object cannot respond to a received message, it delegates that message to another.(106)

This is the core of what inheritance is all about. If one object doesn't know how to respond to a property or method call, we check its parent object, if the parent object doesn't know how to respond, we check the next level up, and so on and so on.

As you can probably imagine, diffrent languages implement inheritance systems different ways. Let's not worry about that too much right now though. Just remember that at its core inheritance is a pretty simple idea. 

---

At this point you should be familiar with constructor functions:

```javascript
function Monster(name,color){
  this.name = name;
  this.color = color;
}
```

You can use them to create new objects with some built-in properties.

```javascript
var bigfoot = new Monster('Bigfoot','brown');
var yeti = new Monster('Yeti','white');
console.log(bigfoot);
> Monster { name: 'Bigfoot', color: 'brown'  }
console.log(yeti);
> Monster { name: 'Yeti', color: 'white'  }
```

If we want to give a new property to one of our individual monster objects we can do that like so:

```javascript
bigfoot.age = 500;
console.log(bigfoot);
> Monster { name: 'bigfoot', color: 'brown', age: 500 }
yeti.age = 500;
console.log(yeti);
> Monster { name: 'Yeti', color: 'white', age: 500 }
```

Let's say we decide that by default all monsters have two eyes. We'd like to set that property on all our existing monster objects. Instead of manually updating each individual monster object, like we did with the `age` property above, we can utilize the Monster function's special `prototype` property to define properties that all monster objects will inherit. 

```javascript
Monster.prototype.eyes = 2;
```
Now all our monster objects will also respond to the `eyes` property, including all the ones that already exist.

```javascript
console.log(yeti.eyes);
> 2
console.log(bigfoot.eyes);
> 2
```

However, if you log the entire `yeti` or `bigfoot` object, as we did before, it still doesn't show the `eyes` property

```javascript
console.log(bigfoot);
> Monster { name: 'Bigfoot', color: 'brown', age: 500 }
console.log(yeti);
> Monster { name: 'Yeti', color: 'white', age: 500 }
```
So what's going on here? Let's back up and talk a little bit about the big picture.


### \_\_proto\_\_ and prototype

It's not usually displayed, but all objects and functions in JavaScript have a special prototype property, which by default is an empty object. You can think of a prototype as a kind of template. When new objects are created using an existing object as a template, they will copy that existing object's prototype, and inherit all the properties within. 

Keep in mind that any prototype properties inherited by an object are distinct from the properties defined in a constructor function using the `this` keyword, but we'll get into that more later.

You access an object's prototype with the `__proto__` property:

```javascript
var dessert = {name: 'Ice Cream', flavor: 'Chocolate' };
console.log(a.__proto__);
> {}
```

A function's prototype is accessed with the `prototype` property:

```javascript
function Cat(name,color){
  this.name = name;
  this.color = color;
}
console.log(Cat.prototype);
> Cat {}
```

As we said above, by default prototypes are empty.

Any objects created from a constructor function will have the same prototype as that function:

```javascript
var fluffy = new Cat('Fluffy', 'white');
console.log(fluffy.__proto__);
> Cat {}
fluffy.__proto__ === Cat.prototype
> true

```

Any properties added to a constructor's prototype object will then be inherited down to its child objects:

```javascript
Cat.prototype.hair_length = 'long';
console.log(fluffy.hair_length);
> 'long'
```

Because `fluffy.__proto__`  and `Cat.prototype` point to the same object you can also set a prototype property like so: 

```javascript
fluffy.__proto__.claws = 'sharp'
```

If we go back to our two monster objects, we can see the age property that we added to the Monster constructor function prototype:

```javascript
console.log(bigfoot.__proto__);
> Monster { age: 500 }
```

Because we defined an `age` property on the Monster prototype, all Monster objects will respond with that value by default. However, if we explicitly define an `age` property on the specific bigfoot or yeti objects, it will override the prototype:

```javascript
Monster.prototype.age = 500;
bigfoot.age = 1;
console.log(bigfoot.age);
> 1
console.log(yeti.age);
> 500
```

We can check whether a property is inherited or local to an object with the `hasOwnProperty()` function:

```javascript
 bigfoot.hasOwnProperty('age');
 > true
 yeti.hasOwnProperty('age');
 > false
```

As you can see, because we defined  a local `age` property to `bigfoot`, `hasOwnProperty` returned true, but `yeti`, which only has an inherited `age`, returns false.

TK: Exercise

At this point it's probably important to distinguish a little bit between the properties inherited as part of a constructor's prototype object and the properties created as part of the constructor function using the `this` keyword.

Just to review, here's our  Monster constructor and its prototype again: 

```javascript
function Monster(name,color){
  this.name = name;
  this.color = color;
}

Monster.prototype.age = 500;

```

All objects created with the Monster constructor will have an `age` and `name` property, but only `age` is part of the prototype. `name` and the other properties are local to the individual objects created and are not part of the inheritance chain. In this way a constructor function is similar to the `initialize` method of Ruby classes and other languages. Anything defined using `this` is local to the new object that's created.

You may be wondering what properties to put in a constructor function and what properties to put in the prototype. The rule-of-thumb generally is that you only put instance-specific data in the constructor and anything that is shared among the objects can go in the prototype. By keeping methods and properties in the prototype you avoid duplication, so it's a good place to store anything shared. 


So that's the basics of prototypes in JavaScript. But how would you actually use them in practice?

## Constructor pattern vs Prototype Pattern

SO MAYBE REVIEW THE CONSTRUCTOR PATTERN AGAIN THEN INTRODUCE THE PROTOTYPE PATTERN
FINALLY INTRODUCE THE FULL CLASS PATTERN WHICH IS AN EXTENSION OF THE CONSTRUCTOR PATTERN
NOT SURE IF THAT'S THE BEST IDEA BUT LET'S GIVE IT A SHOT

what about this kinda thing- non-constructor pattern, prototypal pattern:

var man = Object.create(human);
is the same as
var man = {}; && man.__proto__ = human;


var human = {};
var man = Object.create(human);
var johnDoe = Object.create(man);


START HERE
ALSO YOU GOTTA GET SOMETHING IN WITH THE CODE BLOCK AROUND 680

---
### Prototype Pattern


We've already looked at the the constructor pattern of setting up inheritance chain:

```javascript
function Monster(name,color){
  this.name = name;
  this.color = color;
}

Monster.prototype.age = 500;
var sasquach = new Monster('sasquach', 'gray');
console.log(sasquach.age);
> 500
```

This pattern is great when you want to be able to create lots of different objects from a single constructor, but there's actually another much simpler pattern you can follow:

```javascript
var beer = {ingredients: ['water','barley','yeast', 'hops']}
var ale = {fermentation: 'top'};
ale.__proto__ = beer;
console.log(`Ale's first ingredient is ${ale.ingredients[0]}`) 
>"Ale's first ingredient is water""

beer.drink = function(){
  console.log('glug!');   
}

ale.drink();
>"glug!"
```


This pattern is great for quick and simple prototype chains, but if you want something more robust, you may want to consider to use the psudeo-class pattern.
TK: Exercise


### Classical vs Prototypal Based Inheritance

Before we get too in the weeds of prototypes, it may be helpful to distinguish it from the more common class-based inheritance models. They are both hierarchical models of real world objects, but there are some subtle distinctions. 

 
Class-based object-oriented languages like Ruby or Python primarily use two types of abstractions to represent the world: objects, which represent specific instances of something and classes, which are generalizations of a type of objects that hold common properties and functions. All objects belong to a class. Classes can inherit properties and methods from other classes, creating a single inheritance chain. 

Let's use one of my favorite type of objects as an example, beer.

- The Beer Narragansett is an example of a lager.
- Lager, along with Ale, is one of the two main categories of beer.
- Beer is a delicious treat made of hops, barley and yeast

Here's how such a language might represent this hierarchy of beer:

| Level of Abstraction | Name | Comments |
| --- | --- | --- |
| 1 | `myBeer`  | an object of the class `Narragansett`, representing my actual beer.  |
| 2 |  `Narragansett` | a class, which contains all the properties and methods that cans of `Narragansett` share, such as being made on honor |
| 3 | `lager` | a superclass of `Narragansett`. It contains all the properties that `Narragansett` shares with other `lager` subclasses, such as being bottom-fermenting |
| 4 | `Beer` | a superclass of `lager`, which contain the basic properties of beer |




Inheritance as message forwarding
an object is an instance of a thing
a class is a definition of a class of things 

A class definition is sort of like a cooking recipe
A recipe for pizza is instructions for how to create a pizza. If you follow it, you'll have pizza. But the recipe is not pizza itself. You can't eat a recipe. 

https://stackoverflow.com/a/19640910

// The above is okay, but doesn't really paint a good big picture. Adapt the code below into something clearer


```javascript
function Cat(name,color){
 this.name = name;
 this.color = color;
 }

 var f = new Cat('fluffy', 'white')
 Cat.prototype.age = 3;
 f.age = 5;
 console.log(Cat.prototype);
 console.log(f.__proto__);
 var m = new Cat('muffin', 'brown');
 console.log(m.__proto__)

 console.log(f.age);
 //5
 console.log(f.__proto__.age)
 //3
 console.log(f.hasOwnProperty('age'));
 //true
 console.log(m.hasOwnProperty('age'));
 //false


f.age //checks instance first and then forwards up the inheritance chain

// updating prototype after it's been define
Cat.prototype.age = 4
Fluffy.__proto__.age = 4
//both do he same

//if we redefine Cat, the existing children aren't affected, but any new ones are
Cat.prototype = {age: 88};
var s = new Cat('s','something');

```
## Spread Operator (ES6)

The spread operator (...) expands enumerables like Arrays  to allow for easier manipulation of their content.


```javascript
var a = [1,2,3];
console.log(a);
> [1,2,3]
console.log(...a);
> 1 2 3
```

This may not seem that powerful, but actually makes it much easier to manipulate and edit arrays. For example, in ES5, the easiest way to concatenate two arrays is probably to use the concat function:
```javascript
var a = [1,2,3];
var b = [4,5,6];
var a_and_b = a.concat(b);
> [1,2,3,4,5,6]
```

With the spread operator:
```javascript
var a = [1,2,3];
var b = [4,5,6];
var a_and_b = [...a,...b];
> [1,2,3,4,5,6]
```

Reordering an array also becomes easier:

```javascript
var a = [1,2,3];
var a = [0,...a,4,5];
> [0,1,2,3,4,5]
```

__Objects__

Support for the spread operator has also been proposed for objects. It's not officially supported yet, but is widely expected to become part of an update to the language soon. In the meantime, you can use it if you use a transpilier such as (Babel)[https://babeljs.io/].

The neat thing about the spread operator for objects is that it makes it real easy to exact clone objects, or make clones of object that differ slighly. Check it:


```javascript
var me = {
  name: "ME",
  age: 37
}
var me_clone = {...me};
console.log(me_clone);
> Object {"age": 37,"name": "ME"}
var you = {...me,name:'you'}
console.log(you);
> Object {"age": 37,"name": "you"}
```

## Immediately Invoked Function Expression (IIFE)

Because Javascript doesn't have explicit techniques for setting privacy and access levels, certain approaches have been developed to create effective privacy controls through certain patterns and workarounds. One such technique is known as the immediately invoked function expression or IIFE (Pronounced 'ifey')

Here's a template:

```javascript
(function () {
    // code goes here
})();
```
Although that might look a bit scary, all it really is is a function that's immediately run, and not stored in memory for later use.

Here's a (slightly contrived) example:

```javascript
(function (){
var secret_number = Math.floor(Math.random() * 101);
console.log(`Psst! The secret number is ${secret_number}`) 
})()
```

The above code is effectively similiar to the following:
```javascript
var log_secret_number = function (){
var secret_number = Math.floor(Math.random() * 101);
  console.log(`Psst! The secret number is ${secret_number}`) 
};
log_secret_number();
```

So why use an IIFE? Well they can offer a few advantages in the right circumstantes:

1. __Privacy__: In the non-IIFE example immediately above, `log_secret_number` is exposed in the global name space, meaning that any other global object could call it again, which you probably don't want. Because it is immediately invoked you ensure it's invoked once and only once. Also because the `secret_number` variable is scoped to the IIFE function, it can't be accessed by anything else.
2. __Memory/Performance__: The `log_secret_number` function is now in memory forever, even though it's not needed again. IIFEs are immediately cleaned up after use, freeing up memory.
3. __Namespace__: Now that you've defined a `log_secret_number` function in the global namespace, there's always the possibility of collusion with another library or developer's work. Because nothing is exposed outside of the IIFE you ensure against this.




