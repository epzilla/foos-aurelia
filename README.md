# SnappyFoos
A foosball scoretracker using the [Aurelia](http://aurelia.io) JavaScript MVC framework

## TODOs (in priority order)
* ~~Livereload on client-side in "watch" step~~
* ~~Convert to Jade instead of plain HTML~~
* ~~Convert to Stylus instead of plain CSS~~
* ~~Implement score increment/decrement logic~~
* ~~Implement end-game logic~~
* ~~Implement end-match logic (I think this is essentially already done)~~
* ~~Push socket updates on score changes (right now only happening on match finish)~~
* Make some sort of animation for when scores change and when games/matches end
* Implement stat keeping logic on game end
* Create stats schema
* Implement stats & history page
* (more to come, as I think of them)

## Installation

### Prerequisites
Before installing the project, make sure you have the following installed/configured on your machine:

* [Git](http://git-scm.com/book/en/Getting-Started-Installing-Git) (`brew install git`)
* [NodeJS and npm](http://nodejs.org/) (`brew install node`)
* [Gulp](http://gulpjs.com) (`npm install -g gulp`)
* [Bower](http://bower.io) (`npm install -g bower`)
* [JSPM](http://jspm.io) (`npm install -g jspm`)

### Installing
* Clone the repo

```
git clone https://git.synapse-wireless.com/adam.epling/snappy-foos.git
```

* Install npm dependencies

```
npm install
```

* Install jspm dependencies

```
jspm install -y
```
* Install bower dependencies

```
bower install
```

### Try it out
If all went well, you should be able to just run `gulp watch` to start the app