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
  }

  activate () {
    this.http.get(this.url + 'matches/current').then(response => {
      if ((response.content.length > 0) && response.content[0].active) {
        this.matchInProgress = true;
        this.currentMatch = response.content[0];
        var heads1 = this.currentMatch.heads[0].name.split(' ');
        var heads2 = this.currentMatch.heads[1].name.split(' ');
        var tails1 = this.currentMatch.tails[0].name.split(' ');
        var tails2 = this.currentMatch.tails[1].name.split(' ');
        this.headsTitle = heads1[heads1.length - 1] + ' / ' + heads2[heads2.length - 1];
        this.tailsTitle = tails1[tails1.length - 1] + ' / ' + tails2[tails2.length - 1];
      } else {
        this.matchInProgress = false;
      }
    });
  }

}