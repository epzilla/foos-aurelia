export class NavCloser {

  close () {
    let el = $('.navbar-collapse.collapse.in');
    if (el) {
      $(el).collapse('hide');
    }
  }

}