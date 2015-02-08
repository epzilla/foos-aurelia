export class FlashAttachedBehavior {
  
  static inject() { return [Element]; }
  
  constructor (element) {
    this.element = element;
  }

  valueChanged (newValue, oldValue) {
    if (oldValue || oldValue === 0) {
      if (newValue === 10) {
        window.setTimeout( () => {
          let scores = this.element.querySelectorAll('.score');
          scores[scores.length - 2].classList.add('score-flash');
        }, 100);
        window.setTimeout( () => {
          let scores = this.element.querySelectorAll('.score');
          scores[scores.length - 2].classList.remove('score-flash');
        }, 5100);
      } else {
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

}

export function install(aurelia) {
  aurelia.withResources([FlashAttachedBehavior]);
}