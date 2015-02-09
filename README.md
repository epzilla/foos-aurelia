# SnappyFoos
A foosball scoretracker using the [Aurelia](http://aurelia.io) JavaScript MVC framework

## TODOs (in priority order)
* Change templates to resolve heads/tails confusion
* Implement stat keeping logic on game end
* Implement stats & history page
* Make some sort of animation for when matches end
* Set game start time on game changeover
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