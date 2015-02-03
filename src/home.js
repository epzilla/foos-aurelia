export class Home {
  constructor () {
    this.heading = '';
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.matchInProgress = true;
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`;
  }

  welcome () {
    alert(`Welcome, ${this.fullName}!`);
  }

  startNewMatch () {
    alert('New match!');
  }

  currentMatch () {
    return {
      heads: {
        players: [{
          id: 0,
          name: 'Adam Epling'
        },{
          id: 1,
          name: 'Kurt Copley'
        }],
        title: 'Epling / Copley'
      },
      tails: {
        players: [{
          id: 2,
          name: 'Mia Chung'
        },{
          id: 3,
          name: 'Emerson Price'
        }],
        title: 'Price / Chung'
      },
      scores: [{
        heads: 10,
        tails: 8
      }, {
        heads: 7,
        tails: 10
      }],
      startTime: '3:44pm',
      gameNum: 3,
      gameStartTime: '4:08pm',
      history: {
        allTimeMatchRecord: 'Price / Chung lead 7-6',
        allTimeGameRecord: 'Epling / Copley lead 22-19',
        avgScore: 'Epling / Copley 8.7 - 8.5'
      }
    };
  }
}