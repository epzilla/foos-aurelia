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
* Implement stat keeping logic on game end
* Create stats schema
* Implement stats & history page
* Make some sort of animation for when scores change and when games/matches end (Already did most of this, but could use some cleaning up)
* Figure out solution to the heads/tails dilemma
  * Right now, when you start a new match, you choose who flipped head and who flipped tails, and for the rest of the game, those two teams are the "heads team" and "tails team". The problem is that in associating black with heads and yellow with tails, it could be confusing during the middle game when teams switch sides.
  * A possible solution could be to remove references to "heads/tails" altogether except from the initial selection screen, just have them be "team 1" and "team 2", and not show any color bias toward either.
  * Another, likely more complicated, solution would be to actually have the teams swap sides and colors each game, but then the stat-keeping would probably be even more difficult.
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