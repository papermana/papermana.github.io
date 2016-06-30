//  This is based on a value from _layout.scss:
const START_ANIMATION_TIME = 1000;

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('start');
  document.body.addEventListener('click', startFunc);

  function startFunc() {
    document.body.removeEventListener('click', startFunc);
    document.body.classList.remove('start');
    document.body.classList.add('start-anim');

    setTimeout(() => {
      document.body.classList.remove('start-anim');
    }, START_ANIMATION_TIME);
  }
});
