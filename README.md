# SnappyFoos
A foosball scoretracker using the [Aurelia](http://aurelia.io) JavaScript MVC framework

## TODOs (in priority order)
* Make some sort of animation for when matches end
* Make configrable
  * At Synapse, we usually play to 10, and best-of-three, but we still play the 3rd game even when the match has been decided. These should be the defaults, but if you decided to play by ITSF rules, you're supposed to play each game to 5 points, and it's best 3 of 5 games. Also, the final game of a match must be won by 2 points, up to a maximum of 8. Alternatively, what if you're pressed for time, and only want to play 2 games? And oh no! What if one team wins game 1 and the other wins game 2? Suddenly, we have a tie! So even though these are "edge cases", they could come up, and should probably be accounted for by some configuration.
* ENHANCEMENT: Offline-first (sometimes the wi-fi is spotty in the foosball room. Perhaps if we lose connection, we just keep score on the device, then when we regain the connection, we can send the update.
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
If all went well, you should be able to just run `gulp` to start the app