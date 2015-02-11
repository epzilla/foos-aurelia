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
    this.socket = io.connect(window.location.hostname.concat(':',this.options.port));
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
          this.currentTeam1 = this.currentMatch.scores[this.currentMatch.gameNum - 1].team1;
          this.currentTeam2 = this.currentMatch.scores[this.currentMatch.gameNum - 1].team2;
        }

        if (data.status === 'new') {
          this.setUp();
        }
        // } else if (data.status === 'ok') {
        //   this.addFlair(data.whatChanged);
        // }
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
    this.team1Title = this.currentMatch.team1.title;
    this.team2Title = this.currentMatch.team2.title;
    this.currentTeam1 = this.currentMatch.scores[this.currentMatch.gameNum - 1].team1;
    this.currentTeam2 = this.currentMatch.scores[this.currentMatch.gameNum - 1].team2;
    this.team1Class = '';
    this.team2Class = '';
    this.setClasses();
  }

  setClasses () {
    if (this.currentTeam1 > this.currentTeam2) {
      this.team1Class = 'winning-score';
      this.team2Class = 'losing-score';
    } else if (this.currentTeam2 > this.currentTeam1) {
      this.team1Class = 'losing-score';
      this.team2Class = 'winning-score';
    }
  }

  startNewMatch () {
    alert('New match!');
  }

  endMatch () {
    alert('Ending match!');
  }

  getTeam1Class () {
    return 'winning-score';
  }

  getTeam2Class () {
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

  // addFlair (change) {
  //   console.dir(change);
  //   if (change.gameOver) {
  //     // Do winning team flair
  //     console.log(change);
  //   } else {
  //     // Do goal scored flair
  //     var score = $('.' + change.team + '-scores .score').last();
  //     score.addClass('score-flash');
  //     window.setTimeout( () => {
  //       score.removeClass('score-flash');
  //     }, 5000);
  //   }
  // }

  startedMatch () {
    if (this.currentMatch._id) {
      return (this.currentMatch._id.concat(window.navigator.userAgent) === this.ls.get('matchID'));
    }
    return false;
  }

}