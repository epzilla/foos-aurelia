import {HttpClient} from 'aurelia-http-client';
import {Config} from './config';
import {LocalStorage} from './local-storage';

export class Home {
  static inject() { return [HttpClient, Config, LocalStorage]; }

  constructor (http, config, localStorage) {
    this.options = config.conf();
    this.ls = localStorage;
    this.url = this.options.apiUrl;
    this.http = http;
    this.moment = moment;
    this.byTeam = false;
  }

  activate () {
    this.http.get(this.url + 'matches/current').then(response => {
      if ((response.content.length > 0) && response.content[0].active) {
        this.matchInProgress = true;
        this.currentMatch = response.content[0];
        var team1player1 = this.currentMatch.team1[0].name.split(' ');
        var team1player2 = this.currentMatch.team1[1].name.split(' ');
        var team2player1 = this.currentMatch.tails[0].name.split(' ');
        var team2player2 = this.currentMatch.tails[1].name.split(' ');
        this.team1Title = team1player1[team1player1.length - 1] + ' / ' + team1player2[team1player2.length - 1];
        this.tailsTitle = team2player1[team2player1.length - 1] + ' / ' + team2player2[team2player2.length - 1];
      } else {
        this.matchInProgress = false;
      }
    });
  }

  toggleTeam (isTeam) {
    this.byTeam = isTeam;
  }

}