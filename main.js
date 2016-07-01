//  This is based on a value from _layout.scss:
const START_ANIMATION_TIME = 1000;

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('start');
  document.body.style.width = 'calc(100vw - ' + getScrollbarWidth() + 'px)';
  document.body.addEventListener('click', startFunc);
});

//  Make sure that the page always start at the very top:
window.addEventListener('load', () => {
  setTimeout(() => window.scroll(0, 0), 0);
});

function startFunc() {
  document.body.classList.remove('start');
  document.body.classList.add('start-anim');
  document.body.removeEventListener('click', startFunc);

  setTimeout(() => {
    document.body.classList.remove('start-anim');
    document.body.style.width = null;
  }, START_ANIMATION_TIME);
}


//  This is based on https://gist.github.com/bryanbuchs/6da1fed2bd4131f72deb:
function getScrollbarWidth() {
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild(inner);

	document.body.appendChild(outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;

	if (w1 == w2) {
		w2 = outer.clientWidth;
	}

	document.body.removeChild(outer);

	return (w1 - w2);
}