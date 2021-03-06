import {Router} from 'aurelia-router';
import bootstrap from 'bootstrap';

export class App {
  static inject() { return [Router]; }
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'SnappyFoos';
      config.options.pushState = true;
      config.map([
        { route: ['','home'],  moduleId: 'home', nav: true, title:'Home' },
        { route: 'newMatch',  moduleId: 'newMatch', nav: false },
        { route: 'stats', moduleId: 'stats', nav: true, title: 'Stats'}
      ]);
    });
  }
}