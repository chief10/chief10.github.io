---
layout: post
title:  Better Media Queries With SASS

---

CSS preprocessors are awesome. Years ago, I was reluctant to start using them
because I didn't want to have yet another thing to learn. However, with SCSS the
learning curve is dropped to pretty much nothing -- allowing people to write
plain CSS until they want to use some of the additional bells and whistles
provided by SASS.

Today, we are going to look at how we can use SCSS to make media queries much
easier to maintain. The first most important part of making media queries
manageable, is making sure the pixel widths between screen sizes remain
consistent. Nothing is more annoying than having a bunch of media queries
everywhere with different min and max widths.

The problem with consistency within CSS does not stop at screen widths for media
queries, some other pain points can be the management of colors, text-sizes,
fonts, etc. Have you ever had a project that had ten different variations on the
color blue? I know I have and changing all of those colors was a pain.

The first step to overcome these difficulties is to create a `_variables.scss`
file. This file is the source of truth when it comes to handeling style. Though
the extent of use in this file might vary from project to project, in general,
this is where you want to put any "theming" logic. 

## _variables.scss

Let's start our `_variables.scss` file with the different widths for our
application:

<script src="https://gist.github.com/chief10/3e9a971d2b92b1d144cf.js"></script>

This is the bare minimum of what we would need. We could use this as follows:

<script src="https://gist.github.com/chief10/4ae8ceca58d5d8598786.js"></script>

Sure, this could work, but it is still more verbose than it needs to be and
still requires the developer to remember when and where little adjustments like
that `- 1` are needed. In short, we can still do better. 

## _utils.scss

Let's create a file called `_utils.scss`. This is where we are going to put our
convenience methods for our SASS code.

There are many ways one can create convinience methods for calling media
queries. To each their own, but this is the way I have come to create them:
<script src="https://gist.github.com/chief10/07528d5c95fa33a23887.js"></script>

An example of how we could use these methods:
<script src="https://gist.github.com/chief10/f9a1a64d2c13f5d98ed5.js"></script>

And that is how one can make media queries managable.

Another positive of doing things this way, is that if you decide you want to
change the breakpoints in your application, you do not need to hunt down each
individual width declaration, you can just change it in the main
`_variables.scss` file to have them propogated throughout the entire
application.

One quick note: within your `index.scss` file where all of your imports are
being pulled in, be sure to have your `_variables.scss` file first, followed by
your `_utils.scss` file. This is important because variables and methods are
only available based on the order of which they are brought into the project.
Meaning, if we try to use a variable value in a file that is placed within
`index.scss` before the `_variables.scss` file, an error will be thrown and your
build will fail. 

<script src="https://gist.github.com/chief10/813de4166c9d73dc3ba0.js"></script> 



