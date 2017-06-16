## Data Types

- Number
- String
- Object
- Function
    - Array
    - Date
    - RegExp
- null
- undefined
- Boolean
- Symbol (new in ES2015)

Proper JS style suggests you end most statements with a semicolon. Most JS engines will try to add them in for you if you forget them, but that can result in unexpected behavior, so just use them.

The Mozilla Developer Network is a great place to go for all documentation on JavaScript. Check out this link. It's full of documentation, tutorials and examples.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/

## Comments

```javascript
// single line

/* multi line
  do do do
  blah blah blah
*/
```

## Numbers
Technically all numbers in JS are stored as floating point numbers, meaning there are no integers, but in practice you can still use them like you normally would with all the basic math type operations:

```javascript
> 2 + 2 
4 
> 3 * 8 
24 
> 25 / 5 
5
> 3.65484 * 4.000545
14.6213518878
```

You know the drill. We'll learn more about more number/math stuff as we need it.

## Strings

Marked with single or double quotes:

```javascript
"hello" 
'world' 
```

You can use either one. If you need to include a quote mark in your string, you can use the backslash to escape them:

```javascript
> console.log("It's \"game\" time.");
// It's "game" time.
> console.log('It\'s "game" time.');
// It's "game" time."
```

As you can see, `console.log()` is how you print things out to the terminal. It's similar to `puts` or `print` in other languages.

You can concatenate two strings with the plus sign:

```javascript
"Hello" + "World"
> ’HelloWorld'
```

Watch out when concatenating strings and numbers though:

```javascript
> "6" + 2
'62'

// But also:

> "6" * 2
12
```

This type coercion happens because JS is said to have weak typing. Obviously this doesn't fly in strongly typed languages like Ruby:

```ruby
[1] pry(main)> "6" + 2
TypeError: no implicit conversion of Fixnum into String
from (pry):1:in `+'
[2] pry(main)> "6" * 2
=> "66"
```

We'll get into this kind of stuff later, just know it's out there.

Strings have a bunch of built-in methods and properties:

```javascript
> "hello".length
5
> "hello".toUpperCase()
'HELLO'
> "hello".toUpperCase().replace("HELLO","Goodbye")
'Goodbye'
>
```

Notice that length is a property and toUpperCase is a method, so the second one requires parentheses when you call it, so do all functions in JS.

This is our first taste of functions and objects. More on those later. As you can see, you can use dot notation and chain multiple operations onto each other. 

## Other Data Types

**null** and **undefined**  
`null` is a special value/type that indicates a deliberate non-value, similiar to `nil` in Ruby. Unlike Ruby, JS also has `undefined`, which it uses to indicate an unitialized value, for example a variable that has been initialized, but has never been defined. We'll see more on this later.

**Boolean**  

JS has `true` and `false` like many other languages. For more info on what types of values will be coerced into each, check the **Truthiness** section below.

**NaN** 
This is a special instance of `Number` that stands for "Not at Number". It is used to represent edge cases like when you divide 0 by 0. You can test for it with `isNan()`.

**Infinity**  
Another special instance of `Number` to basically represent numbers larger than what JS is capable of displaying.

**Date**, **Regexp** and **Symbol** we won't be covering today, but know that they're out there 


## Variables

There are three different ways to declare variables: `var`, `const` and `let`. Those last two are relatively recent additions to JS and do different things with scope and access. For the moment let's just focus on `var` as it's the primary way to define variables.

```javascript
var a = 1;
var name = "fart";

```

A variable can be assigned to most other things, including objects, arrays and functions.
It's possible to define a variable without setting a value, doing so will result it having the special type and value "undefined". More on that later.

```javascript
> var a;
> console.log(a);
undefined
```

### Exercise 1

Define your `age` and `name` and then log a single string that says "Howdy, my name is `<your name>` and I'm `<age>` years old."


## Comparisons 

So as you've already seen, you assign variables with the `=` operator. Comparing things an be done with `<`, `>`, `<=` and `>=`:

```javascript
> 5 < 2
false
> 1 > 0
true
```

Checking equality of two things can be a little tricky. There's `==` and `===` but you almost always want to use `===`.

The double-equals operator performs type coercion if you give it different types, with sometimes interesting results:

```javascript
123 == '123'; 
> true
1 == true; 
> true
```
To avoid type coercion, use the triple-equals operator:

```javascript
123 === '123';
> false
1 === true;    
> false
```
There are also `!=` and `!==` operators, which mean "not equal".

**Truthiness**

Before we go too much further, this is a good time to look at what values JavaScript considers to be "true" and what values it considers to be "false", besides the keywords `true` and `false`.
Obviously if you compare two numbers you know what to expect:

```javascript
> 1000 < 500000
true
```
but what happens if you try to compare two strings?

```javascript
> "zero" < "one"
false
```

The deal is that every language has to decide what types of values it will coerce into `true` and `false` when you compare them. Obviously the string "one" isn't literally equal to `true`, it's a string, not a boolean. That's why we use the terms **truthy** and **falsy**.

The following six values are always evaluated to false in JavaScript:

- false
- 0 (zero)
- ""  or '' (empty string)
- null
- undefined
- NaN 

All other values are truthy, including "0" (zero in quotes), "false" (false in quotes), empty functions, empty arrays, and empty objects.

## Arrays

You know arrays. They're ordered lists of data elements. Technically arrays in JS are a special type of Object. More on that later. An array can contain any type of item. Numbers, strings, objects, other arrays, etc. 

We've got two main ways to create a new array:

```javascript
> var a = new Array();
> a.push('dog');
> a.push('cat');
> a.push('hen');
> console.log(a);
[ 'dog', 'cat', 'hen' ]
```
or

```javascript
> var a = ['dog', 'cat', 'hen'];
```

The second method, knows as *an array literal*, is the preferred method.
 

You access array elements with their index number, which begin at 0, not 1:

```javascript
> a[0];
"dog"
> a[1];
"cat"
> a[2];
"hen"
```

You can also use index numbering to re-define a specific element:

```javascript
> a[2] = "duck";
'duck'
> a
[ 'dog', 'cat', 'duck' ]
```

If you ever have trouble with the concept of zero-indexing, a good way to think of it is "places away from the beginning".

Arrays come with a special .length property, which is one more the index of the final item in the array

```javascript
> a.length
3
```

Note that `array.length` isn't necessarily the number of items in the array. Consider the following:

```javascript
> var a = ['dog', 'cat', 'hen'];
> a[100] = 'fox';
> a.length; 
101
```

Just like variables, array elements can be almost anything, strings, numbers, objects even other arrays. Take a look at this example:


```javascript
> var potions = ['health', 'strength','speed'];
> var weapons = ['knife', 'mace', 'dagger', 'wand'];
> var inventory = [potions,weapons];
> console.log(inventory);
[ [ 'health', 'strength', 'speed' ],[ 'knife', 'mace', 'dagger', 'wand' ] ];
```

A nested array like this is sometimes known as a *2-D array*. You can access the various elements by chaining the index calls:


```javascript
> inventory[0]
[ 'health', 'strength', 'speed' ]
> inventory[0][1]
'strength'
>
```

### Pop Quiz

Complete the following:

```javascript
> console.log(inventory)
[ [ 'health', 'strength', 'speed' ],[ 'knife', 'mace', 'dagger', 'wand' ] ]
> inventory.length
????
```

### Exercise 2

Define an array of the last 3 things you ate, then log to the console a single line explaining what each one was.

Example: "The last thing I ate was Hamburgers, but before that I had some Tacos. Before that I had some Pizza"


### Some quick Array tips

As I said earlier, arrays are technically a special kind of object. There's a special `typeof` function in JS that tells you what type a thing is:


```javascript
> typeof 1.654
'number'
> typeof "a"
'string'
> new_obj = new Object
{}
> typeof new_obj
'object'
```
but check it:

```javascript
> new_array = []
> typeof new_array
'object'
```
Fortunately there's a handy `Array.isArray()` function:

```javascript
> Array.isArray(new_array);
true
```


It's possible to iterate over an array with a for loop like this:

```javascript
for (var i = 0; i < a.length; i += 1) {
  // Do something with a[i] 
}
```

For example:
```javascript
> for (var i = 0; i < a.length; i += 1) {
  console.log(a[i]);
   }
dog
cat
duck
```

However, if someone added new properties to Array.prototype, they will also be iterated over by this loop.  **Therefore this method is "not" recommended for production code.** We'll get into prototypes a little later.

Another way of iterating over an array that was added with ECMAScript 5 is forEach():

```javascript
a.forEach(function(element) {
    console.log(element);
});
```

```javascript
var a = ['badger','duck','hen'];
a.forEach(function(i) {
    console.log(i);
});
badger
duck
hen
```

Also new thing alert: Did you notice `i += 1` in the first for loop code? What's with that?

`i += 1` is just a shortcut for `i = i + 1`. Most languages feature it or something like it. There's also `i -= 1`. You aren't limited to 1, you can use any number there.

You may also sometimes see `i++` or `++i`, which are similar in that they also increment a variable by 1. They can be a little tricky though:

`i++` technically means "return the value, and then increment and store the new value"

`++i` technically means "increment the value, then return it and store it"

```javascript
> var i = 0;
> console.log(i);
0
> i++
0
> console.log(i);
1
> i++
1
> console.log(i);
2
```

So just be careful with it.

### Exercise 3

Define an array of the last 3 things you ate, then use a `forEach` loop to log each element in it's own line.

Example: 
"I ate a Burger"
"I ate a Pizza"
"I ate a steak"


### More Array Operations

Add an element to an array:

```javascript
a.push("new thing");
```

Remove and return the last item of an array:
```javascript
> var a = [1,2,3];
> a.pop();
3
> console.log(a);
[1,2]
```

Get the index of an item:

```javascript
> a.indexOf("cat");
 1
```

Remove an item by index position:

```javascript
> var a = ['zero', 'one', 'two', 'three'];
> var sliced = a.slice(1, 3);
> console.log(a);      
['zero', 'one', 'two', 'three']
console.log(sliced); 
['one', 'two'] 
```

### Exercise 4

Given the following array:

```javascript
var meals = ["Breakfast","Lunch","Dinner"];
```
1. add "Midnight Snack" to it.
2. Rename "Lunch" to "Brunch".
3. Log your favorite meal.


## Loops

Loops are a way of running the same code repeatedly until a condition is met.

**While**

Here's the basic structure of a while loop:
```javascript
while(<some expression is true>) {
  <run this code>
}
```

Here's a basic example:
```javascript
var number = 1;
while (number <= 5) {
  console.log("Number now equals " + number);
  number++;
}
```
The above code will log the following to the console:
```
Number now equals 1
Number now equals 2
Number now equals 3
Number now equals 4
Number now equals 5
```

This while loop will run forever:
```javascript
while(true) {
<do something>
}
```

This loop will never ever run:
```javascript
while(false) {
<do something>
}
```

### Exercise 5

Let's say you're a young wizard engaged in battle. Your enemy has a HP of 20 and the only spell you have avaiable is Fire Bolt. Write a while loop the repeatedly casts Fire Bolt (by logging "I cast Fire Bolt!") until your enemy's HP is no longer above zero. You can cast it as many times as needed, but it alwas deals exactly 2 damage.


**Bonus question**

So any real dungeon master will tell you that Fire Bolt doesn't have a consistent damage of 2 points. It's actually calculated a quick 1d10 roll. Here's how to generate a random number from 1 to 10:


```javastript
Math.floor(Math.random() * (max - min + 1)) + min
```

Update your while loop to deal a random amount of damage.

[Here's](https://stackoverflow.com/a/1527820) an explanation of how this random number generator works. 


**For**

Basic structure:
```javascript
for (<starting command> ; <loop if this expression is true> ; <do this after each loop>) {
  <do something during each loop>
}
```

We already saw a basic example of a for loop earlier with arrays:
```javascript
for (var i = 0; i < a.length; i += 1) {
  /* Do something with a[i] */
}
```

But remember we should probably be using forEach loops for arrays instead

### Exercise 6

Here's a loop that prints every integer between 1 and 100:

```javascript
for (var i = 1; i <= 100; i += 1) {
  console.log(i);
}
```
Change it so that it starts at 5 and counts by fives up to 200

Bonus question: Write a loop that starts at 100 and counts down to 0 by 3s


## Conditionals

**If statements**

Here's the basic form of an if statement:
```javascript
if (<some condition is true>) {
  // <do some commands>
}
```
Here's a quick example:

```javascript
var grade = "A";
if (grade === "A") {
  console.log("Great Job");
}
```
Outputs "Great Job", but if you were to define grade as anything else, it would not.

**If/Else**

Let's throw in an else statement:
```javascript
if (<some condition is true>) {
  <do some commands>
} else {
  <some other commands>
}
```
Here's an example:
```javascript
var grade = "C";
if (grade === "A") {
  console.log("Great Job");
} else {
    console.log("Nice try, dummy.");
}
```
Which will output "Nice try, dummy."


What about an else if
```javascript
if (<some condition is true>) {
  <do some commands>
} else if (<a second condition is true>) {
  <commands to be run>
} else {
  <some other commands>
}
```
Here's another example:
```javascript
var grade = "B";
if (grade === "A") {
  console.log("Great Job");
} else if (grade === "B") {
  console.log("Not bad");
} else {
    console.log("Nice try, dummy.");
}
```
Which will log "Not bad"

**Switch** 

You can add as many `else if` statements as you want. For example:
```javascript
var grade = "C";
if (grade === "A") {
  console.log("Great Job");
} else if (grade === "B") {
  console.log("Not bad");
} else if (grade === "C") {
  console.log("Not great");
} else {
    console.log("Nice try, dummy.");
}
```

But as you can see, that starts to get a little tough to read, so instead you can use this special syntax know as the "switch statement":

```javascript
var grade = "D";
switch (grade) {
  case "A":
    console.log("Great Job");
    break;
  case "B": 
    console.log("Not bad");
    break;
  case "C":
    console.log("Not great");
    break;
  default:
    console.log("Nice try, dummy");
}
```

The default clause is optional. It's like an else statement. The break statements are needed 99% of the time. Otherwise you get what's knows as a fallthrough, but you're unlikely to ever want that.

### Exercise 7

Write some code that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”."
Try to use if statements and loops in your answer.

**Pro tip:** You can use the `%` operator to get the remainder of one number divided by another:

```javascript
> 10 % 5
0
> 11 % 5
1
```
Note: Unlike many languages technically this is not a modulo operator. The difference being that the modulo operator result would take the sign of the divisor, not the dividend.

## Objects

At a basic level, objects in JS are just simple name/value pairs. It's similar to hashes in Ruby or dictionaries in Python. I've you've dealt JSON before, then you're familiar with JavaScript objects. JSON stands for JavaScript Object Notation. It's a testament to how simple, powerful and human-readable JSON is that basically every other major programming language supports it.

In a language like Ruby you've got classes, hashes, modules, structs and all sorts of different ways of organizing your data and your methods. In JS you've just got objects and functions. There are certain limitations due to this, but overall JS objects can be very simple and very powerful at the same time. We'll see more on this later.


There's two basic ways to create a new object.
```javascript
var person = new Object();  
person["name"] = "Bob";  
person["age"] = 50;  
```  
or

```javascript
var person = {
  "name": "Bob",
  "age": 50
}; 
```

The second is called *object literal syntax*, and it strongly preferred over the other way.


You can then call an object's elements like so:

```javascript
> person["name"];
"Bob"
```

Dot notation will also work:

```javascript
> person.name
"Bob"
```

But this can collude with some other functionality, so I'd recommend using the bracket way for most things.

You can nest other objects and arrays inside of objects. For example here we've nested the `details` object inside the `lunch` object:

```javascript
var lunch = {
  name: 'Carrot',
  details: {
    color: 'orange',
    size: 12
  }
};
```
You can access nested objects/arrays by chaining, similar to how we handled nested arrays before:

```javascript
> lunch["details"]["size"]
12
> lunch["name"]
"Carrot"
```

### Exercise 8

Let's build a very basic DnD character. Define a `player` object. It should contain the following properties:

- name
- class
- inventory, which is a nested array
- your inventory should contain at least two items

Once `player` has been defined, write a console log that introduces your character and lists your current inventory.

## Functions


Along with objects, functions are the key to understanding JavaScript. Here's the basic format:

```javascript
function name_of_function(paramater1,parameter2,etc....) {
  // some cool code;
  // something else;
}
```

Here's a real simple example:

```javascript
function add(a,b) {
  var total = a + b;
  return total;
}
```
Then you can run:  
```javascript
> add(2,5); 
7 
```

### Exercise 9

Go back to the wizarding question (Exercise 5). Refactor rolling a 1d10 into a stand alone `rollDie` function. Then refactor casting Fire Bolt and dealing damage into a `fireBolt` function.



**Some things to note about JS functions:**

- To call a function and have it run you must include the paratheses at the end. In the above example we ran **add(2,5);**. The two parameters we passed to the function were 2 and 5. If we had some function that didn't require parameters though, we still need to include the empty parameters: **blah();**
- A JavaScript function can take 0 or more named parameters.
- The function body can contain as many statements as you like
- can declare its own variables which are local to that function. We'll get into variable scope in a bit. It's a very powerful and important part of JS.
- The return statement can be used to return a value at any time, terminating the function. If no return statement is used (or an empty return with no value), JavaScript returns undefined.

The named parameters turn out to be more like guidelines than anything else. You can call a function without passing the parameters it expects, in which case they will be set to undefined.

```javascript
> add(); 
NaN 
```
This fails because you can't perform addition on undefined. 

You can also pass in more arguments than the function is expecting:
```javascript
> add(2, 3, 4);
5 
```
As you can see, it added the first two parameters, which were expected; the third one,4, was ignored.

There's lot's of little ins and outs like this to be aware of when it comes to functions, but don't worry about memorizing all of them. Just be aware that they're out there. We'll come back to the important ones as needed. 

**The Arguments Object**

When called, all functions generate a special internal pseudo-array called *arguments* that contain everything passed to it at run time. This is very similar to the params array in Rails. With it we can rewrite the add function above like so:

```javascript
function add(a,b) {
  var total = arguments[0] + arguments[1];
  return total;
};
```

Now that might not be the best use of of the arguments array, but you can use it to do some  neat stuff. For example, let's rewrite the add function to handle as many numbers as we throw at it:

```javascript
function add() {
  var sum = 0;
  for (var i = 0, l = arguments.length; i < l; i += 1) {
  sum += arguments[i];
  }
  return sum;
}
```

### Exercise 10

Modify the above function to calculate the average instead of the sum.

**Function Declarations vs. Function Expressions**

The syntax we've seen so far for defining a function is known as a *function declaration*. But that's not the only way to define a function in JavaScript. Remember how we said that a variable can be almost anything? Well, that includes functions: 


```javascript
var add = function(a,b) {
  var total = a + b;
  return total;
};
```

This format above is known as a **Function Expression**. The variable itself is set to the body of the function. You can then call it like you would any function with `add();`

For reference, here's the other syntax that we already know, a **Function Declaration**:

```javascript
function add(a,b) {
  var total = a + b;
  return total;
}
```
One of the advantages of function expressions is that we can assign a function to an object property, just like any other variable:

```javascript
// I make a basic object
var me = {
  "Name":"Poo",
   "Age":23
   }
// I can call attributes of that object
> console.log("Hello, my name is " + me["Name"]);
Hello, my name is Poo

// Let's turn that last command into a stored function of the "me" object

> me.introduce = function() {
  console.log("Hello my name is " + me["Name"]);
 };

//Now I can call it:
> me.introduce()
Hello my name is Poo
```
**Hoisting**

Functions are the same no matter how you define them, but there are a few subtle distinctions with what you can do with them and when they are loaded into memory. Let's look at that now.


If you run the following block of code as a script, you'll get an error:

```javascript
functionOne();
// Uncaught TypeError: functionOne is not a function

var functionOne = function() {
  console.log("Hello!");
};
```

This seems obvious, right? You can't call a function before you define it. But what about this code: 

```javascript
functionTwo();

function functionTwo() {
 console.log("Hello!");
};
```
Well, if you try it yourself, you'll see that it actually works. What's going on here?

This is what's known as *hoisting*. Here's a formal definition from Mozilla:

>Variable and function declarations are put into memory during the compile phase, but stays exactly where you typed it in your coding.
(Source: https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

A good way to think of it is that your variable and function declarations are *hoisted* to the top of your code. In the above examples functionOne was defined using an expression, so it was only put into memory when the interpreter got to that line, but in the second example, functionTwo was defined using a function declaration, so it was defined as soon as the script was compiled. Obviously this won't work in the console, but when you load a whole script, then it applies.

Also another important distinction to make here is that while variables are put into memory, that's different than being defined.

The following code will log "Hello!":

```javascript
functionTwo();

function functionTwo() {
 console.log("Hello!");
};
```

Now take a look at this:

```javascript
console.log(a);

var a = "some text";
```

You might think that this code would log "some text", or maybe throw an error. Instead what it does is log `undefined`. This is because JavaScript really thinks about the code above like this:


```javascript
var a;
console.log(a);
a = "some text";
```

This isn't something you need to worry about too much right now. Just be aware it's out there. For more info check out [this blog post](https://scotch.io/tutorials/understanding-hoisting-in-javascript).

## Scope

Variables defined with `var` are said to be scoped to the function they are in, or globally if they don't exist in any specific function. This means that anything defined inside a function only exists inside that particular function. Let's take a look at this and its implications:


> JavaScript does not have block scope even though its block syntax suggests that it does. This confusion can be a source of errors. JavaScript does have function scope. That means that the parameters and variables defined in a function are not visible outside of the function, and that a variable defined anywhere within a function is visible everywhere within the function. In many modern languages, it is recommended that variables be declared as late as possible, at the first point of use. That turns out to be bad advice for JavaScript because it lacks block scope. So instead, it is best to declare all of the variables used in a function at the top of the function body.
  - JS: The Good Parts p. 36

Variables are scoped to the function in JavaScript. Things defined inside a function only exist inside that function. Let's take a look:

```javascript
var a = "outside the function";
function functionOne() {
    var a = "inside the function";
    console.log("logged from inside the function: " + a);
}

console.log("logged from outside the function: " + a);
"logged from outside the function: outside the function"

// and if we now call the function, we'll get a different result logged:

functionOne();
"logged from inside the function: inside the function"
```

Another example of this is the fact that if we define a new variable inside the function, it will not exist at all outside the function:

```javascript
var a = "outside the function";
function functionOne() {
  var a = "inside the function";
  var b = "also inside the function";
  console.log("logged from inside the function: " + a);
}

console.log("logged from outside the function: " + a);
"logged from outside the function: outside the function"
console.log("logged from outside the function: " + b);
"Uncaught ReferenceError: b is not defined"
```

Any nested functions will have access to any values declared in parent scopes, but not the other way around. Another way to think of this is that access starts at the lowest level and extends outward, but never inwards.

Example:

```javascript
var a = "outside the function";

function functionOne() {
  var a = "inside the first function";
  function functionTwo() {
    var b = "inside the nested function";
    console.log("logged from inside the nested function: " + a);
    console.log("logged from inside the nested function: " + b);

  }
  functionTwo();
  console.log("logged from inside the first function: " + a);
  console.log("logged from inside the first function: " + b);

}
console.log("logged from outside the scope: " + a);
functionOne();
functionTwo();
```

Results in the following output

```
logged from outside the scope: outside the function
logged from inside the nested function: inside the first function
logged from inside the nested function: inside the nested function
logged from inside the first function: inside the first function
Uncaught ReferenceError: b is not defined
```
