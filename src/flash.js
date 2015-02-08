export class FlashAttachedBehavior {
  
  static inject() { return [Element]; }
  
  constructor (element) {
    this.element = element;
  }

  valueChanged (newValue, oldValue) {
    if (oldValue) {
      window.setTimeout( () => {
        let scores = this.element.querySelectorAll('.score');
        scores[scores.length - 1].classList.add('score-flash');
      }, 100);
      window.setTimeout( () => {
        let scores = this.element.querySelectorAll('.score');
        scores[scores.length - 1].classList.remove('score-flash');
      }, 5100);
    }
  }

}

export function install(aurelia) {
  aurelia.withResources([FlashAttachedBehavior]);
}