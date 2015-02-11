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
    this.http.get(this.url + 'teams').then(response => {
      this.teams = response.content;
      this.sort('teams');
    });
    this.http.get(this.url + 'players').then(response => {
      this.players = response.content;
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
          'avgPtsAgainst',
          'name']).reverse();
    }
  }
}