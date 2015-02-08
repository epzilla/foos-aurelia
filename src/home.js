import {HttpClient} from 'aurelia-http-client';
import {Config} from './config';
import {LocalStorage} from './local-storage';

export class Home {
  static inject() { return [HttpClient, Config, LocalStorage]; }

  constructor (http, config, localStorage) {
    this.options = config.conf();
    this.ls = localStorage;
    this.url = this.options.apiUrl;
    this.matchInProgress = false;
    this.http = http;
    this.socket = io.connect(window.location.hostname.concat(':',this.options.socketPort));
    this.currentMatch = {scores: [], gameNum:0};
    this.moment = moment;
  }

  activate () {
    this.socket.on('connect', () => {
      console.info('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.warn('Socket disconnected');
    });

    this.socket.on('matchUpdate', (data) => {
      if (data.status === 'finished') {
        this.currentMatch = {scores: []};
        this.matchInProgress = false;
      } else {
        this.currentMatch = data.updatedMatch;
        
        if (data.updatedMatch.active) {
          this.matchInProgress = true;
        }

        if (data.status === 'new') {
          this.setUp();
        } else if (data.status === 'ok') {
          this.addFlair(data.whatChanged);
        }
      }
    });

    this.socket.on('matchError', (data) => {
      console.log(data);
      if (data.status === 'matchUpdateFailed') {
        let gameIndex = this.currentMatch.gameNum - 1;
        let team = data.team;
        let score = data.rollbackScore;
        this.currentMatch.scores[gameIndex][team] = score;
        this.matchInProgress = false;
      }
    });

    return this.http.get(this.url + 'matches/current').then(response => {
      if ((response.content.length > 0) && response.content[0].active) {
        this.matchInProgress = true;
        this.currentMatch = response.content[0];
        this.setUp();
      } else {
        this.matchInProgress = false;
      }
    });
  }

  setUp () {
    var heads1 = this.currentMatch.heads[0].name.split(' ');
    var heads2 = this.currentMatch.heads[1].name.split(' ');
    var tails1 = this.currentMatch.tails[0].name.split(' ');
    var tails2 = this.currentMatch.tails[1].name.split(' ');
    this.headsTitle = heads1[heads1.length - 1] + ' / ' + heads2[heads2.length - 1];
    this.tailsTitle = tails1[tails1.length - 1] + ' / ' + tails2[tails2.length - 1];
    var currentHeads = this.currentMatch.scores[this.currentMatch.gameNum - 1];
    var currentTails = this.currentMatch.scores[this.currentMatch.gameNum - 1];
    this.headsClass = '';
    this.tailsClass = '';
    if (currentHeads > currentTails) {
      this.headsClass = 'winning-score';
      this.tailsClass = 'losing-score';
    } else if (currentTails > currentHeads) {
      this.headsClass = 'losing-score';
      this.tailsClass = 'winning-score';
    }
  }

  startNewMatch () {
    alert('New match!');
  }

  endMatch () {
    alert('Ending match!');
  }

  getHeadsClass () {
    return 'winning-score';
  }

  getTailsClass () {
    return 'losing-score';
  }

  changeScore (team, plusMinus) {
    if (plusMinus === 'plus') {
      this.currentMatch.scores[this.currentMatch.gameNum - 1][team]++;
    } else {
      this.currentMatch.scores[this.currentMatch.gameNum - 1][team]--;
    }

    let payload = {
      team: team,
      plusMinus: plusMinus,
      id: this.currentMatch._id
    };
    this.socket.emit('scoreChange', payload);
  }

  addFlair (change) {
    console.dir(change);
    // if (change.gameOver) {
    //   // Do winning team flair
    //   console.log(change);
    // } else {
    //   // Do goal scored flair
    //   var score = $('.' + change.team + '-scores .score').last();
    //   score.addClass('score-flash');
    //   window.setTimeout( () => {
    //     score.removeClass('score-flash');
    //   }, 5000);
    // }
  }

  startedMatch () {
    if (this.currentMatch._id) {
      return (this.currentMatch._id.concat(window.navigator.userAgent) === this.ls.get('matchID'));
    }
    return false;
  }

}