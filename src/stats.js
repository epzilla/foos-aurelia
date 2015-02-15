import {HttpClient} from 'aurelia-http-client';
import {Config} from './config';
import {NavCloser} from './nav-closer';
import {LocalStorage} from './local-storage';

export class Home {
  static inject() { return [HttpClient, Config, NavCloser, LocalStorage]; }

  constructor (http, config, navClose, localStorage) {
    this.options = config.conf();
    this.ls = localStorage;
    this.navClose = navClose;
    this.url = this.options.apiUrl;
    this.http = http;
    this.moment = moment;
    this.byTeam = false;
  }

  activate () {
    this.navClose.close();
    let teamPromise = this.http.get(this.url + 'teams');
    let playerPromise = this.http.get(this.url + 'players');
    return Promise.all([teamPromise, playerPromise]).then(responses => {
      this.teams = responses[0].content;
      this.players = responses[1].content;
      this.sort('teams');
      this.sort('players');
    });
  }

  toggleTeam (isTeam) {
    this.byTeam = isTeam;
  }

  sort (whatToSort, sortBy) {
    switch (sortBy) {
      case 'name':
        this[whatToSort] = _.sortByAll(this[whatToSort], 'name');
        break;

      case 'gameRecord':
        this[whatToSort] = _.sortByAll(this[whatToSort], [
          'gamesWon',
          'pct',
          'matchesWon',
          'avgPtsFor',
          'avgPtsAgainst']).reverse();
        break;

      case 'avgScore':
        this[whatToSort] = _.sortBy(this[whatToSort], function (a) {
          return (a.avgPtsFor - a.avgPtsAgainst);
        }).reverse();
        break;

      default:
        this[whatToSort] = _.sortByAll(this[whatToSort], [
          'pct',
          'matchesWon',
          'gamesWon',
          'avgPtsFor',
          'avgPtsAgainst']).reverse();
    }
  }
}