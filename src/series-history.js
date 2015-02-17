import {Behavior} from 'aurelia-framework';

export class SeriesHistory {
  static metadata (){
    return Behavior.customElement('series-history')
                   .withProperty('series'); }

  constructor () {
  }

}