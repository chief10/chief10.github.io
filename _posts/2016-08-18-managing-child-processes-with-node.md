---
layout: post
title: 'Managing Child Processes in Nodejs'
---


Nodejs is great at many things -- specifically handling real-time communication via sockets between server and client. However, due to Node's non-blocking nature, handling CPU intensive tasks can be taxing and block the event loop from taking on new tasks. Situations like this are specifically what the `child_process` module is great at handling and make it worth looking at.

## Creating/Controlling External Processes

As was mentioned above, CPU intensive tasks do not play very nicely with Node's single-threaded, non-blocking mechanism for handling requests and processing data. Because of this, when an 'expensive' task is needed to run, it is best to assign a different process for that task to keep the event loop free and unencumbered. Another time one might want to spin up a child process within a Node script, is if one wants to run an OS command and work with the data output from said command.  

Here is a very simple version how how one could use the child_process module to run an external shell command from within a shell script.

<script src="https://gist.github.com/chief10/8228bebfca46f592f679507091a6616e.js"></script>

Im sure you can guess what this script does.

### Limitations of `exec`

While the `exec` command may seem downright magical at first, it still has its limitations. First, other than running command-line arguments and assigning new environment variables, there really is little one can do to communicate with said child process. Second, because the child process output is buffered, it cannot be streamed and still can consume memory while running.

## `child_process.spawn`

All is not lost. To circumvent some of these limitations of the `exec` command, we have the ability to `spawn` new modules. To better illustrate some of the differences between the two, let's take a look at this code:

<script src="https://gist.github.com/chief10/72eb637a26c063221d5f984bef0e53ac.js"></script>

This is simply spawning a child process that runs "tells" a 'tail' command to let us know everytime `somewhere.txt` changes. To respond to changes to this file, we need to listen for them everytime they happen. Let's take a look at how we could go about doing this:


<script src="https://gist.github.com/chief10/85624e255e2d52c2d93fadeaaefe41d8.js"></script>


In the code above, we have added two new pieces of code: one to handle a successful change to our file of interest, and one to handle potential errors -- such as when `somewhere.txt` does not exist.

Sometimes, we might want to know when a child process 'exits'. Doing that is pretty simple and requires us to listen to the 'exit' event. The callback function for the listen event has two arguments: `code` and `signal`. Depending on the cause of the child_process's exit, one or the other will be used when exiting.

<script src="https://gist.github.com/chief10/403fcfa89baa69ea29615a01338bd7b0.js"></script>

If we want to manually kill a process from within our node program, we can do so my calling the child_process `kill` method. While the `kill` method does not need anything passed to it to work, we can optionally pass it a string as an event name for the process to respond to if need be.

<script src="https://gist.github.com/chief10/7902ab094642320159537b2300701679.js"></script>

## Wrapping up

This post only lightly touches on the node `child_process` module but I do hope it shed some light on how one can use the module to make already-awesome apps, even more so. 







