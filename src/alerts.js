import {Behavior} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

export class Alerts {
  static metadata () { return [Behavior.customElement('alerts')]; }
  static inject () { return [EventAggregator]; }
  
  constructor (eventAgg) {
    this.alerts = [];
    this.events = eventAgg;
    this.events.subscribe('alerts', payload => {
      if (this.alerts.length > 0) {
        this.alerts = [];
      }
      this.alerts.push(payload);
      window.setTimeout(() => {
        this.alerts.shift();
      }, 5000);
    });
  }
}