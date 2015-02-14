import {HttpClient} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import {Config} from './config';
import {LocalStorage} from './local-storage';

export class NewMatch {
  static inject() { return [HttpClient, Router, Config, LocalStorage]; }
  constructor(http, router, config, localStorage){
    this.options = config.conf();
    this.ls = localStorage;
    this.heading = 'New Match';
    this.http = http;
    this.theRouter = router;
    this.http.defaultRequestHeaders.add('Content-Type', 'application/json');
    this.players = this.ls.get('players') || [];
    this.setInitialPlayers();
    this.playersURL = this.options.apiUrl + 'players';
    this.matchesURL = this.options.apiUrl + 'matches';
    this.isWorking = false;
  }

  activate () {
    this.playTo = 10;
    this.bestOf = 3;
    this.http.get(this.playersURL).then(response => {
      if (this.players.toString() !== response.content.toString()) {
        this.players = response.content;
        this.ls.set('players', this.players);
        this.setInitialPlayers();
      }
    });
  }

  setInitialPlayers () {
    this.team1Player1 = this.players[0];
    this.team1Player2 = this.players[1];
    this.team2Player1 = this.players[2];
    this.team2Player2 = this.players[3];
  }

  startNewGame () {
    this.isWorking = true;
    var payload = {
      team1: [this.team1Player1._id, this.team1Player2._id],
      team2: [this.team2Player1._id, this.team2Player2._id]
    };
    return this.http.post(this.matchesURL, payload).then( (res) => {
      /* Set localStorage item "matchID" to a mash-up of the newly created match ID and
       * the browser's user agent string. This should be unique enough to prevent
       * someone who didn't start the game from tampering with it
      */
      this.ls.set('matchID', res.content._id.concat(window.navigator.userAgent));
      this.isWorking = false;
      this.theRouter.navigate('home');
    });
  }
}