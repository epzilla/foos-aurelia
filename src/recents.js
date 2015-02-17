import {Behavior} from 'aurelia-framework';

export class Recents {
  static metadata (){
    return Behavior.customElement('recent-matches')
                   .withProperty('recents'); }

  constructor () {
  }

}