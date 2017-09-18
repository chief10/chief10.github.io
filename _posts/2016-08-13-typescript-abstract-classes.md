---
layout: post
title: 'Typescript Abstract Classes'
---

Typescript is pretty awesome and because of that, I have been falling in love with it as of late. Though I seldom venture beyond using interfaces and inline type definitions, Typescript really does offer much, much more.

Today I want to take a moment to look at `abstract` classes and methods within Typescript.

## Abstract classes

The over-simplified definition of `abstract` classes in Typescript is that they are to Javascript classes, what `interface` is to Javascript objects. They provide implementation details and potentially some scaffolding information to create instances of a particular class. Similar to an `interface`, nothing from an `abstract` class definition actually exists at runtime.  

Here is an example of `abstract` classes in action:
<script src="https://gist.github.com/chief10/a78d955d8f8b324975702035c26e5bb4.js"></script>

There are some interesting things going on here. First, you can see that we were able to create a child class `BMW` that inherited from our abstract class, `Car`. Further, we can see the main difference between an `abstract` class and a "regular" one by trying to create an instance of the `Car` class directly -- as our compiler throws an error saying "No, No, gypsy! You cannot due that".

Another interesting thing is when we look at the methods in the `abstract class Car`. Since the method `typesOfCar` is an abstract one, all it is being used for here is to tell any children of `Car` that they must have a method called `typesOfCar` defined and that it must return `void`. However, by looking at the method definition for `countWheels()`, the `abstract` key word is noticeably absent. In this case, any children derived from `Car` will inherit that method as they normally would.

I wrote this post mostly for myself to better my understanding of Typescript's awesomeness. I hope it helps others out as well. 

