// iNoBounce
(function(global) {
	var startY = 0;
	var enabled = false;
	var handleTouchmove = function(evt: TouchEvent) {
		var el = evt.target;
		while (el !== document.body) {
			var style = window.getComputedStyle(<HTMLElement>el);
			if (!style) {
				break;
			}
			if ((<HTMLElement>el).nodeName === 'INPUT' && (<HTMLElement>el).getAttribute('type') === 'range') {
				return;
			}
			var scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
			var overflowY = style.getPropertyValue('overflow-y');
			var height = parseInt(style.getPropertyValue('height'), 10);
			var isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
			var canScroll = (<HTMLElement>el).scrollHeight > (<HTMLElement>el).offsetHeight;
			if (isScrollable && canScroll) {
                var curY = evt.touches ? evt.touches[0].screenY : (<any>evt).screenY;
				var isAtTop = (startY <= curY && (<HTMLElement>el).scrollTop === 0);
				var isAtBottom = (startY >= curY && (<HTMLElement>el).scrollHeight - (<HTMLElement>el).scrollTop === height);
				if (isAtTop || isAtBottom) {
					evt.preventDefault();
				}
				return;
			}
			el = (<HTMLElement>el).parentNode;
		}
		evt.preventDefault();
	};
	var handleTouchstart = function(evt: TouchEvent) {
		startY = evt.touches ? evt.touches[0].screenY : (<any>evt).screenY;
	};
	var enable = function() {
		window.addEventListener('touchstart', handleTouchstart, false);
		window.addEventListener('touchmove', handleTouchmove, false);
		enabled = true;
	};
	var disable = function() {
		window.removeEventListener('touchstart', handleTouchstart, false);
		window.removeEventListener('touchmove', handleTouchmove, false);
		enabled = false;
	};
	var isEnabled = function() {
		return enabled;
	};
	var testDiv = document.createElement('div');
	document.documentElement.appendChild(testDiv);
	(<any>testDiv.style).WebkitOverflowScrolling = 'touch';
	var scrollSupport = 'getComputedStyle' in window && (<any>window.getComputedStyle(testDiv))['-webkit-overflow-scrolling'] === 'touch';
	document.documentElement.removeChild(testDiv);
	if (scrollSupport) {
		enable();
	}
	var iNoBounce = {
		enable: enable,
		disable: disable,
		isEnabled: isEnabled
	};
	if (typeof global.define === 'function') {
		(function(define) {
			define(function() { return iNoBounce; });
		}(global.define));
	} else {
    	global.iNoBounce = iNoBounce;
	}
}(this));