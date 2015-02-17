import {HttpClient} from 'aurelia-http-client';
import {Config} from './config';
import {LocalStorage} from './local-storage';
import {NavCloser} from './nav-closer';
import {EventAggregator} from 'aurelia-event-aggregator';

export class Home {
  static inject() { return [HttpClient, Config, LocalStorage, NavCloser, EventAggregator]; }

  constructor (http, config, localStorage, navClose, eventAgg) {
    this.options = config.conf();
    this.ls = localStorage;
    this.navClose = navClose;
    this.events = eventAgg;
    this.url = this.options.apiUrl;
    this.matchInProgress = false;
    this.http = http;
    this.currentMatch = {scores: [], gameNum:0};
    this.moment = moment;
    this.online = true;
  }

  activate () {
    var self = this;
    this.navClose.close();
    this.socket = io.connect(window.location.hostname.concat(':',this.options.port), {forceNew: true});
    this.socket.on('connect', () => {
      console.info('Socket connected');
      this.online = true;
      this.addSocketHandlers();
      this.pushScoreUpdate();
    });

    return this.http.get(this.url + 'matches/current').then(response => {
      if ((response.content.length > 0) && response.content[0].active) {
        this.matchInProgress = true;
        this.currentMatch = response.content[0];
        this.setUp();
        
        this.http.get(this.url + 'matches/recent').then(response => {
          var recents = response.content;
          this.formatMatches(recents);
          this.recents = recents;
        });

        this.http.get(this.url + 'matches/series?team1=' + this.currentMatch.team1._id +
          '&team2=' + this.currentMatch.team2._id).then(response => {
            var stats = response.content;
            this.formatMatches(stats.matches);
            this.series = stats;
          });
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

  formatMatches (matches) {
    var self = this;
    matches.forEach(function (match) {
      var start = self.moment(match.startTime);
      var end = self.moment(match.endTime);
      match.formattedDate = self.moment(match.endTime).format('MMMM D');
      match.mins = end.diff(start, 'minutes');
    });
  }

  addSocketHandlers () {
    this.socket.on('disconnect', () => {
      console.warn('Socket disconnected');
      this.online = false;
      if (!this.expectDisconnect) {
        this.sendAlert();
      }
    });

    this.socket.on('matchUpdate', (data) => {
      this.currentMatch = data.updatedMatch;
      this.matchInProgress = true;
      this.currentTeam1 = this.currentMatch.scores[this.currentMatch.gameNum - 1].team1;
      this.currentTeam2 = this.currentMatch.scores[this.currentMatch.gameNum - 1].team2;
      if (data.status === 'new') {
        this.setUp();
      }
      if (data.status === 'finished'){
        this.handleMatchEnd(data.winner);
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
    
    if (this.online) {
      this.socket.emit('scoreChange', payload);
    } else {
      this.queuedMatch = this.currentMatch;
    }
  }

  pushScoreUpdate () {
    // If we have a socket connection, and scores that need updating, send them
    if (this.online && this.queuedMatch) {
      this.socket.emit('scoreBatchUpdate', this.queuedMatch);
    } 
  }

  sendAlert (type='info', icon='info-circle', msg=`You're offline. But no worries, your
    score will continue to be kept and published when you reconnect.`) {
    this.events.publish('alerts', {
      type: type,
      icon: icon,
      msg: msg
    });
  }

  handleMatchEnd (winner) {
    //TODO Add cool animation thingy here
    // But for now, just...
    console.log(`WINNERS: ${winner.title}!`);
    window.setTimeout(() => {
      this.matchInProgress = false;
      this.currentMatch = {scores: [], gameNum:0};
    }, 10000);
  }

  startedMatch () {
    if (this.currentMatch._id) {
      return (this.currentMatch._id.concat(window.navigator.userAgent) === this.ls.get('matchID'));
    }
    return false;
  }

  deactivate () {
    this.expectDisconnect = true;
    this.socket.disconnect();
  }

}