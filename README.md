# Functional Programming with Ramda
<a href="https://zenhub.com"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>

This repo contains code snippets and a demo for my workshop on Functional Programming with Ramda given at DeveloperWeek 2018. You can find the presentation slides [here](https://github.com/leggechr/functional-programming-with-ramda/blob/master/Legge%2C%20Christine%2C%20Tues.pdf)

There are aspects of functional programming that can be easily leveraged in your current JavaScript codebase to help you write cleaner, more readable, and more maintainable code. In particular, function composition allows you to chain together multiple functions to make sophisticated systems out of simple parts. Ramda is a JavaScript utility library that can help you to write clean, concise and functional code. It makes function composition simple.

<img src="https://github.com/leggechr/functional-programming-with-ramda/blob/master/female-technologist.png" alt=":female-technologist:" height="50" width="50">

The code from my presentation can be run in your terminal with Node.js (make sure you are using Node 8 or higher).

First, clone the repo and install the node modules:
```sh
$ git clone https://github.com/leggechr/functional-programming-with-ramda.git
$ cd functional-programming-with-ramda
$ npm install
```

### Running code snippets
To experiment with the code snippets you can start a Node instance:
```sh
$ node
```

Then in the node shell, load in the code snippet you want:
```sh
> .load CodeSnippets/<file-name.js>
```

At this point you can call any of the defined functions and experiment with their behaviour.

### Running the Tweet graph demo
To run the code from the Tweet graph demo:
```sh
$ node tweetAnalyzer.js
```

### More resources
These are some resources I found helpful when learning about functional programming and Ramda:

- [Mostly Adequate Guide to Functional Programming](https://drboolean.gitbooks.io/mostly-adequate-guide/content/)
- [Ramda homepage](http://ramdajs.com/0.22.1/index.html#)
- [Ramda documentation](http://ramdajs.com/0.22.1/docs/)
- [What Ramda function should I use?](https://github.com/ramda/ramda/wiki/What-Function-Should-I-Use%3F)

### About ZenHub
I work at ZenHub, a collaboration tool that displays natively in GitHub. You can download the extension at [ZenHub.com](http://www.zenhub.com).
