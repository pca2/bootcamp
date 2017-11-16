## Inheritance/Prototypes

Inheritance is a key concept in any object-oriented programming language. Although the implementation details can vary considerably from language to language, the essential idea behind inheritance is relatively simple: message delegation. The following quote from Sandi Metz's _Practical Object-Oriented Design_ sums it up pretty succinctly:

> Inheritance is, at its core, a mechanism for automatic message delegation. It defines a forwarding path for not-understood messages. It creates relationships such that, if one object cannot respond to a received message, it delegates that message to another.(106)

This is the core of what inheritance is all about. If one object doesn't know how to respond to a property or method call, we check its parent object, if the parent object doesn't know how to respond, we check the next level up, and so on and so on. As we'll see today, the actual implementation details can get pretty complex pretty quickly, but it's important to keep in mind that the core of this concept is relatively straightforward.

### Classical vs. Prototypal Inheritance

Class-based inheritance systems are much more common than prototypal systems, so it might be helpful to quickly distinguish the two. Let's review classical inheritance briefly and then contrast it with a prototypal system. 

**Classical Inheritance**

Class-based object-oriented languages, such as Ruby or Python, primarily use two main types of abstractions to represent the world:
- objects: A specific instance of something. An email, a cake, a customer help request, etc.
- classes: A generalization of a type of object. They hold shared properties and functions common to all of those objects. 

In Ruby all objects belong to a class, from which they inherit properties and methods. Classes in turn can inherit things from another class. This hierarchy of `class -> subclass -> object` creates what's known as a _inheritance chain_ or _inheritance path_. 

| Name | Type | Comments |
| --- | --- | --- |
| Cake | class | The base class, and in this instance, a superclass of IceCreamCake |
| IceCreamCake | class | a subclass of Cake. Can also be said to _extend_ the Cake class |
| myBirthdayCake | object  | an instance of the IceCreamCake class. Although it has some properties unique to it, it also inherits many properties from IceCreamCake, which in turn has inherited properties from the Cake class |

On a superficial level, you might think of a class as a blueprint, or recipe, for a type of objects. In the same way that you use an actual ice cream cake recipe to create a real-world ice cream cake, you can use the `IceCreamCake` class to create an `IceCreamCake` object like `myBirthdayCake`.

Cake receipes are of course just a set of instructions, they're not made of flour and sugar. Similiary, the `Cake` class is not a `Cake` object, it's just a set of instructions on how to make `Cake` objects. This may seem like an odd aspect to highlight, but as we'll see in a moment, this metaphor doesn't quite work with prototypal languages.

**Prototypal Inheritance**

Javascript, as a prototype-based language, lacks the concept of classes\*, as such the only abstraction it has at its disposal is objects. The need to share common properties and methods across similiar objects still exists though, and JavaScript accomplishes this by designating certain objects as __prototypes__ of others. An object will inherit all properties of its prototype, similiar to how an object in Ruby or Python inherits the properties of the class it belongs to. Let's take a look at this in action by returning to our example of `Cake -> IceCreamCake -> myBirthdayCake`.
<sub>*Although ES6 did introduce the `class` syntax, it's effectively syntactical sugar over JavaScript's prototype system, as we'll see later. </sub>

First let's define a cake object:

```javascript
var cake = {
  ingredients: ['flour','sugar','eggs','butter','baking powder', 'milk'], 
  flavor:'vanilla'
  };
```
Now let's define an IceCreamCake object that has a `ice_cream_flavor` property:

```javascript
var iceCreamCake = {
  ice_cream_flavor: "vanilla"
  };
```
Right now these are just two plain ol' objects that aren't connected to each other in any way. Let's change that by declaring that `iceCreamCake`'s prototype is `cake`. Once we do that `iceCreamCake` will have access to `cake`'s properties as if they were its own.

```javascript
iceCreamCake.__proto__ = cake;
console.log(`The first ingredient in iceCreamCake is ${iceCreamCake.ingredients[0]}`)
```

Now that we have the `cake -> iceCreamCake` relationship defined we can create a myBirthdayCake object that inherits from both:
```javascript
var myBirthdayCake = {};
myBirthdayCake.__proto__ = iceCreamCake;
myBirthdayCake.flavor = 'chocolate';
console.log(`My birthday cake is ${myBirthdayCake.flavor} with ${myBirthdayCake.ice_cream_flavor} ice cream `)
```

Objects designated as prototypes are still just plain 'ol objects, all that differs is how their `prototype` property has been assigned. Let's take a look at how our cake inheritance chain might look under this system.

| Name | Type | Comments |
| --- | --- | --- |
| cake | object | The prototype of `iceCreamCake`  |
| iceCreamCake | object | The child of `cake`, and the prototype of `myBirthdayCake`  |
| myBirthdayCake | object  | The child of `iceCreamCake` |

(Object.create? By default JS objects don't belong to a class)

__Outline:__
- Explain that the recipe/blueprint metaphor in Ruby, no longer applies. We're _kinda_ cloning objects, but not really (Object.assign is true cloning). It's really more like we're creating KIDS. A kid is kinda a clone of a parent, but not really
- Explain Object.ceate as a shortcut
- functions and prototype
- Constructor pattern. Reveal that all objects made with constructors have their __proto__ set
- Then introduce class pattern as sugar over the constructor pattern


_Internal Note:_ `Object.create()` creates a new object with the prototype of the given parameter
This:
```javascript
var myBirthdayCake = {};
myBirthdayCake.__proto__ = iceCreamCake;
```
Is equivalant to:
```javascript
var myBirthdayCake = Object.create(iceCreamCake);

`Object.assign()` creates a clone of an object with the given properties, but is not a prototype. See also: the spread operator
```



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
function Cat(name,color)6
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
