import {Behavior} from 'aurelia-framework';
import bootstrap from 'bootstrap';

export class StepperCustomElement {
  static metadata (){
    return Behavior
             .customElement('stepper')
             .useShadowDOM()
             .withProperty('num')
             .withProperty('step')
             .withProperty('min')
             .withProperty('max');
  }

  increment () {
    let x = this.num + this.step;
    this.num = x > this.max ? this.max : x;
  }

  decrement () {
    let x = this.num - this.step;
    this.num = x < this.min ? this.min : x;
  }
}