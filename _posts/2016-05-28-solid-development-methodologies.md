---
layout: post
title:  S.O.L.I.D. Development
---

# What is S.O.L.I.D. ?

In software development, everyone has an opinion on just about everything. While much of that extends to how we actually author our code — tabs over spaces, commas at the end of the line instead of the begining, vim vs emacs, etc — there is another side of the coin that looks just beyond these surface-level trivialities: principles of software development. 

There are an endless number of principles that have been set forth by prominent figures in the industry throughout the decades. Due to the sheer amount of principles, the scope of our discussion must be trimmed to a few — and this is where S.O.L.I.D. comes in.

## Enter S.O.L.I.D.

SOLID is an acronym created by a guy named Michael Feathers as a way to describe the "first five principles", as outlined by [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_Cecil_Martin). SOLID stands for:

  + **S**ingle responsibility principle
  + **O**pen/closed principle
  + **L**iskov substitution principle
  + **I**nterface segregation principle
  + **D**ependency inversion principle
  
Each one of these principle could have a book written on it — and likely has. With that in mind, I seek to provide a simple glimpse of what each means. While these principles are mostly skewed towards object-oriented programming, they still hold true for other programming methodologies as well.

### Single Responsibility Principle (SRP)

The Single responsibility principle is perhaps the most well known in the list above. Even so, there are still multiple ways to interpret this. The general definition for it is:

> The single responsibility principle states that every module or class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class. All its services should be narrowly aligned with that responsibility.

That gets the point across, but I tend to like the simpler — and much more concise — definition set out by [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_Cecil_Martin):

> A class should have only one reason to change.	

### The Open/Closed Principle (OCP)

The OCP was first brought to the general public's attention by [Bertrand Meyer](https://en.wikipedia.org/wiki/Bertrand_Meyer) in 1988. The OCP states that:

> Software entities (classes, modules, functions, etc.) should be open for extention, but closed for modification, that is, such an entity can allow its behavior to be extended without modifying its source code.

This one is a bit less straightforward than the SRP. However, the tl;dr for how I have come to understand it is that in the creation of a child class that inherits from a parent class, there should be no modification to existing functions or methods on the parent class to accommodate the child. The only way a parent class should accommodate new functionalities introduced by a child is through extention of the parent class.

### Liskov Substitution principle (LSP)

The LSP was brought to the world by [Barbara Liskov](https://en.wikipedia.org/wiki/Barbara_Liskov) in 1987. The general definition of the LSP is:

>  In a computer program, if S is a subtype of T, then objects of type T may be replaced with objects of type S (i.e. objects of type S may substitute objects of type T) without altering any of the desirable properties of that program (correctness, task performed, etc.).

Basically, children of a parent should always share the same base functionalities as the parent. 

### Interface segregation principle (ISP)

The ISP is yet another principle brought to us by our good friend George C. Martin and states:

> that no client should be forced to depend on methods it does not use. ISP splits interfaces that are very large into smaller and more specific ones so that clients will only have to know about the methods that are of interest to them.

On the surface, this sounds a heck of a lot like the SRP that was covered earlier, though there are some distinctions. First, SRP is more concerned with the actual functionalities of a class, function or module; whereas the ISP is more concerned with the ultimate consumption of a created entity.

To better illustrate the differences between the two, I could have a class that does nothing by make REST calls to a server somewhere. That is its only responsibility, which makes it work in accordance with SRP. On the otherhand, if I have to instantiate a child class and provide that class with information that it needs to be insantiated — but may be irrelevant for the REST call I want to make — that would be a violation of the ISP. 

### Dependency inversion prinsiple (DIP) 

Of all the priciples listed in this post, I found this one to be the most difficult to grasp. The most basic explanation for this principle is:

> A. High-level modules should not depend on low-level modules. Both should depend on abstractions.
> B. Abstractions should not depend on details. Details should depend on abstractions.

Okay... That took my brain on a bit of a inception-like ride. Basically, it says abstractions are your friend and through diligent use of them, one can successfully create high-level components that can both depend on low-level components, but can also be reused independent of them.

## That't it!

This has been a brief snapshot of that SOLID brings to programming. Each of these principles definitely merit their own posts beyond the introduction provided here. Keep your eyes peeled for those potential posts!
