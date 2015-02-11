export class FlashAttachedBehavior {
  
  static inject() { return [Element]; }
  
  constructor (element) {
    this.element = element;
    this.timeouts = [];
  }

  valueChanged (newValue, oldValue) {
    if (oldValue || oldValue === 0) {
      this.clearTimeouts();

      this.timeouts.push(window.setTimeout( () => {
        let scores = this.element.querySelectorAll('.score');
        scores[scores.length - 1].classList.add('score-flash');
      }, 100));
      
      this.timeouts.push(window.setTimeout( () => {
        let scores = this.element.querySelectorAll('.score');
        scores[scores.length - 1].classList.remove('score-flash');
      }, 5100));
    }
  }

  clearTimeouts () {
    this.timeouts.forEach( () => {
      window.clearTimeout(this.timeouts.pop());
    });
  }

}

export function install(aurelia) {
  aurelia.withResources([FlashAttachedBehavior]);
}