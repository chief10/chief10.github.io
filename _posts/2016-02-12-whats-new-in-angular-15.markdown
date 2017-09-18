---
layout: post
title:  What's New in Angular 1.5
---

Since I have been in PHP land for the last couple of months, I have not had as
much of a chance to explore the various pieces of Angular 1 as much as I would
like. Upon getting ready to start a new project for a client, I noticed that
Angular just came out with version 1.5.

Upon looking at some of the changes introduced by version 1.5, it quickly became
clear that the Angular team is going to great lengths to make the upgrade path
from Angular 1 to Angular 2 as breezy as possible. Most of the additions you
will see here, have very similar counter parts in Angular 2.

 In this release, the largest
indicator of that is the new `component` directives feature -- which boasts an
API very similar to that in Angular 2.

In this post, we are going to cover:

1. **Component Directives**
2. **ngAnimateSwap**
3. **$onInit**

## Component Directives

The API for Angular's new component directives really isn't all that different
from the plain old directives we have been using for years. The main two
benefits of using component directives is that the API is far simpler than
regular directives, and they help are yet another way the Angular team seeks to
ease transition from Angular 1 to Angular 2.

To get a feel for a basic example of what a component directive definition might look like, check
out the sample below:
<script src="https://gist.github.com/chief10/ae153a2b271f927e2b0c.js"></script>

For a more detailed list of the ** differences between Directive definition and
Component definition**, check out the chart below -- borrowed from the [Angular
docs website](https://docs.angularjs.org/guide/component):
![Directive definition vs Component definition](/img/posts/directive-component.png)


## ngAnimateSwap

After a complete overhaul of `ngAnimate` in Angular 1.4, in version 1.5, the
team added a new awesome feature to an already really great directive.

Let's look at the definition straight from the [Angular
docs](://code.angularjs.org/1.5.0-rc.0/docs/api/ngAnimate/directive/ngAnimateSwap):

> ngAnimateSwap is a animation-oriented directive that allows for the container to
> be removed and entered in whenever the associated expression changes. A common
> usecase for this directive is a rotating banner component which contains one
> image being present at a time. When the active image changes then the old image
> will perform a leave animation and the new element will be inserted via an enter
> animation.

Basically, when one element in a collection is leaving, the next element enters.

Below is a code example of how this could be implemented.
<script src="https://gist.github.com/chief10/35030721f0d79c0553bc.js"></script>
<script src="https://gist.github.com/chief10/2aefc0c120fc5b591ba5.js"></script>
<script src="https://gist.github.com/chief10/40e22a3bdd243eae3206.js"></script>


## $onInit()

With the introduction of the `$onInit` lifecycle hook, we finally have a clear
place to put initialization logic for directive controllers once the app has been
bootstrapped. While this has not been a *big* problem in the past, having this new
hook takes some of the guess work out where where startup logic should go.
Further, as with many of the other additions that came with Angular 1.5, it also
has an obvious counterpart in Angular 2 with the `ngOnInit()` hook 
-- making the learning curve slightly less steep.

To better understand the problem that this lifecycle hook is solving, let's take
a look at what initialization logic would have looked like in previous versions
of Angular.
<script src="https://gist.github.com/chief10/8f106856cb682243f3b5.js"></script>

As you can see, it isnt too complicated, but why not have a simple way and clear
way to put this logic as almost every application could use it at some point or
another? Here is an example of how to use the new `$onInit()` hook in Angular
1.5:
<script src="https://gist.github.com/chief10/48ff593381fa18342127.js"></script>

Not a whole lot has changed, but it provides a bit of syntactical sugar to the
awesomesauce that is Angular.

This is just a small list of the changes introduced by Angular 1.5. For a full list of the new features introduced in Angular 1.5, [head to the
Angular
blog](http://angularjs.blogspot.com/2016/02/angular-150-ennoblement-facilitation.html).

Until next time!
