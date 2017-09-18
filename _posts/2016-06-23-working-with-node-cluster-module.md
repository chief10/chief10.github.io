---
layout: post
title:  Working with Node's Cluster Module
---

Lately, I have been looking at the most efficient ways to scale a Nodejs application. Of course there are a bajillion different ways to do this and each one might better suit the needs of individual applications better than another way. Today, I wanted to take a look at the Nodejs `cluster` as it makes scaling Node instances pretty straight forward.

## What is the `cluster` module?
As most of us may know, Node is single-threaded. Because of this, it inherently cannot access all of the system resources that one of its multi-threaded counterparts might have access to. One of the quickest/easiest remedies for this truth can be found using the `cluster` module.

In short, the `cluster` module allows us to distribute application load across multiple Node instances running on the same machine. It makes starting multiple instances of the same application a trivial task. Take a look at the image below to see a -- very simple -- version of what I mean:

![Image of cluster module](/img/posts/NodeClusterModule.svg)

The master process is incharge of delegating incoming connections to the clone worker instances. Let's go ahead and scribble the code that would be our "main" process:

```javascript
//child.js
const http = require('http');
const processId = process.pid;
const PORT = 8001;

let j = 0;

const server = http.createServer((req, res) => {
  for (var i = 0; i < 99999; i++) {
    j += i;
  }
  console.log(`This request came from: ${processId}`);
  res.end(`Hola amigos! ${processId} \n`);
});

server.listen(PORT, () => {
  console.log(`Started instance ${processId} on port ${PORT}`);
});
```

This `http` server doesnt do anything too crazy. It will respond to a request by providing a message with its PID and to simulate some real work for the CPU, we have a `for` loop that arbitrarily increases the value of `j` by amount `i`. 

Upon going to `http://localhost:8001` in the browser, we should see something like:

`Hola amigos! 26853` in the browser and `This request came from: 26853` in our console. 

Awesome! Now that we have that piece in place, let's move on to looking at how we would benchmark our script.

## Siege for bench marking our Node instance(s)

Siege is an awesome bench marking tool for checking the performance of your server. Since it does not come natively on Ubuntu machines, let's pull it in:

`$ sudo apt-get install siege`

Now with a new tool in our toolset -- and with our node server still running -- let's give it a spin:

`$ siege -c250 -t10S http://localhost:8001`

1. `-c250`  -  Hits our server with 250 concurrent connections.
1. `-t10S`  -  Those connections should live for 10 seconds. 

After Siege is done doing its thing, we should see something like this show up in our console window to summurize how our server dealt with the test:

```
Availability:                 100.00 %                                        
Elapsed time:                  10.01 secs                                     
Data transferred:               0.05 MB                                       
Response time:                  0.21 secs                                     
Transaction rate:             278.62 trans/sec                                
Throughput:                     0.01 MB/sec                                   
Concurrency:                   58.79                                          
Successful transactions:        2789                                          
Failed transactions:               0                                          
Longest transaction:            0.55                                          
Shortest transaction:           0.00                                          
```
With that in place, let's go ahead and get to the meat of all of this with the cluster module.

# Delegating connections with the cluster module

We already have our main `app.js` script in place, now we create the master process that looks something like this:

```javascript
//master.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus();
  cpus.forEach((i) => {
    cluster.fork();
  });
} else {
  require('./child');
}
```

To better understand what id going on here, when we launch our `master.js`, we are starting the master process -- the process that is "in charge" of managing incoming connections and for handing them off to children. For each core available to our application, the master process will spin up a new application instance to take advantage of all the computing power it can.

Upon starting our master process with `$ node master`, our console should respond with something like: 

```
Started instance 31006 on port 8001                                           
Started instance 31016 on port 8001                                           
Started instance 30998 on port 8001                                           
Started instance 31004 on port 8001  
```

And this makes sense because my computer has four cpu cores available to it.

Now if we go and run our `seige` command again from earlier, we can see how our nicely distributed server performed:

```

Availability:                 100.00 %                                        
Elapsed time:                   9.94 secs                                     
Data transferred:               0.07 MB                                       
Response time:                  0.02 secs                                     
Transaction rate:             381.19 trans/sec                                
Throughput:                     0.01 MB/sec                                   
Concurrency:                    9.49                                          
Successful transactions:        3789                                          
Failed transactions:               0                                          
Longest transaction:            0.16                                          
Shortest transaction:           0.00     
```

Perhaps the most remarkable changes between the first time we ran this command and the second, are in the response time and transaction rate. Both performed a non-trivial amount better than the first time we checked.

Awesome! We have already seen how we can improve the performance of our Node app with a very small amount of code. Let's go ahead and take things one step further and reap an additional benefit of this redundancy by gracefully handling a failed server process.

## Graceful failure

At the end of our `child.js` script, let's add some code that forces it to throw an error every few seconds:

```javascript
//child.js
//...
setTimeout(() => {
  throw new Error('Oh my goodness!');
}, Math.ceil(Math.random() * 4) * 1000);
```

All this code does, is throw an error every few seconds. For those unfamiliar with how Node handles errors, without some other process in place to watch our server, an error will effectively kill the Node server. By not having some way to automatically handle these types of situations, the services provided by the server would be unavailable to any process, user, or service that requires them -- something that is not acceptable in a production environment. 

With this being said, the `cluster module` makes handling potentially disasterous situations such as this one rather trivial; every time one of our instances crashes, we can have the `master` instance fire another one up. Let's take a look at how we can do that by adding some code to our `master.js`:

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus();
  cpus.forEach((i) => {
    cluster.fork();
  });
  
  let errorHandle = handleErrorOfchild();
} else {
  require('./child');
}

function handleErrorOfchild() {
  cluster.on('exit', (worker, code) => {
    if (!worker.suicide && code != 0) {
      console.log(`Uh oh. A worker has crashed with code: ${code}`);
      cluster.fork();
    }
  });
}
```

Here we added some code to handle how our `master` process should deal with exits of child instances. A code of "0" on exit would mean that we intentionally killed the process, so we are checking for something *other than* that. One thing to take note of is that even if one of the instances crashes, the other ones are free to take requests. To illucidate that, let's rev up our `master.js` again and attack it with our `seige` command one more time.

`$ siege -c200 -t10S http://localhost:8001`

The result of running this command while we have instances constantly being shutdown and restarted:

```
Transactions:		        3296 hits
Availability:		       99.97 %
Elapsed time:		        9.12 secs
Data transferred:	        0.06 MB
Response time:		        0.03 secs
Transaction rate:	      361.40 trans/sec
Throughput:		        0.01 MB/sec
Concurrency:		       11.52
Successful transactions:        3296
Failed transactions:	           1
Longest transaction:	        0.19
Shortest transaction:	        0.00
```

Which is very surprising! We can see that even though there was a significant amount of tumult going on and that at least one child was down a at a time, we still enjoyed a `99.97%` availability, with only a marginal hit to the transaction rate and response time! Not too bad!

Let's move on to the final leg of our journey exploring the `cluster` module and look at how we can update our server while experiencing 0 downtime.

## Restarting the server with no downtime

Unless a team has a super coder that can see the future and code accordingly, all servers need to be updated from time to time. Of course, while doing that, it would be preferable to keep all services available in the process.

To do this, we need to add just a little bit more code to our `master.js` file:

```javascript
//master.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus();
  cpus.forEach((i) => {
    cluster.fork();
  });

  let errorHandle = handleErrorOfchild();
  let restartHandle = handleRestartProcess();
} else {
  require('./child');
}

function handleErrorOfchild() {
  cluster.on('exit', (worker, code) => {
    if (!worker.suicide && code != 0) {
      console.log(`Uh oh. A worker has crashed with code: ${code}`);
      cluster.fork();
    }
  });
}

function handleRestartProcess() {
  console.log("From the handleRestartProcess")
  process.on('SIGUSR2', () => {
    console.log("Restarting the entire world.");
    restartSingleWorker(0);
  })
}

function restartSingleWorker(idx) {
  const workers = Object.keys(cluster.workers);

  if (idx >= workers.length) {
    console.log("All workers have been restarted!");
    return
  }

  const worker = cluster.workers[workers[idx]];
  console.log(`Stopping worker with PID: ${worker.process.pid}`);
  worker.disconnect();

  worker.on('exit', () => {
    if (!worker.suicide) return;
    const anotherWorker = cluster.fork();
    anotherWorker.on('listening', () => {
      restartSingleWorker(idx + 1);
    });
  })
}
```

This code is pretty straight forward. It simply takes the amount of workers we have, and for each one, it sequentially shuts down each worker and starts another one up in its place. We can kick the whole process off by starting our `master` process and then killing it.

The command below should give us a list of the processes we currently have running.
`$ ps af`

The output should look something like: 

```
  PID TTY      STAT   TIME COMMAND
29817 pts/23   Ss+    0:00 /usr/bin/zsh
27971 pts/22   Ss+    0:00 /usr/bin/zsh
26565 pts/21   Ss+    0:00 /usr/bin/zsh
23036 pts/26   Ss     0:00 /usr/bin/zsh
28191 pts/26   Sl+    0:00  \_ node master --debug
28199 pts/26   Sl+    0:00      \_ /usr/bin/nodejs /home/godzilla/Desktop/MyWork
28205 pts/26   Sl+    0:00      \_ /usr/bin/nodejs /home/godzilla/Desktop/MyWork
28206 pts/26   Sl+    0:00      \_ /usr/bin/nodejs /home/godzilla/Desktop/MyWork
28217 pts/26   Sl+    0:00      \_ /usr/bin/nodejs /home/godzilla/Desktop/MyWork
14564 pts/20   Ss+    0:00 /usr/bin/zsh
14520 pts/17   Ss+    0:00 /usr/bin/zsh
```

From the output of the command we just ran, we can see that process we want to kill is `28191`. To do that, we run our trusty `kill` command:

`$ kill -SIGUSR 28191`

And in our console we should see:

```
Restarting the entire world.
Worker idx: 0
Stopping worker with PID: 28199
Started instance 28259 on port 8001
Worker idx: 1
Stopping worker with PID: 28206
Started instance 28265 on port 8001
Worker idx: 2
Stopping worker with PID: 28259
Started instance 28271 on port 8001
Worker idx: 3
Stopping worker with PID: 28271
Started instance 28277 on port 8001
All workers have been restarted!
```

And there you have it! In this post, we have covered how to use the `cluster` module to provide redundancies of you main server to better scale, how to handle a process unexpectedly shutting down, and how to restart the entire server with no downtime.

