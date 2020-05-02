/* random description generator */
const descriptions = [
  'an open sourcer',
  'a programmer',
  'a nerd',
  'a space enthusiast',
  'not looking for a job',
  'a meme',
  'from Belgium',
  'a <a href="https://bullg.it">gitch</a>',
  'working at <a href="https://algolia.com">algolia</a>',
  'living in Paris',
];

let oldIndex = 0;

function getIndex(oldIndex = 0, length) {
  const index = Math.floor(Math.random() * length);

  return index === oldIndex ? index - 1 % length : index;
}

//generate a new description
function generate() {
  const index = getIndex(oldIndex, descriptions.length);
  oldIndex = index;
  document.getElementById('generated').innerHTML = descriptions[index];
}

document.getElementById('generator').addEventListener('click', generate);

/* making fallback for meter element work */
document
  .querySelectorAll('meter')
  .forEach(
    meter => (meter.clientHeight === 0 ? (meter.style.border = 'none') : false)
  );

/* scrolling to the next element */

// https://gist.github.com/james2doyle/5694700
// easing functions http://goo.gl/5HLl8
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b;
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

function scrollTo(to, duration = 500) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  function position() {
    return (
      document.documentElement.scrollTop ||
      document.body.parentNode.scrollTop ||
      document.body.scrollTop
    );
  }
  const start = position();
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  return new Promise(resolve => {
    function animateScroll() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      const val = easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        // the animation is done so lets callback
        resolve();
      }
    }
    animateScroll();
  });
}

//adding the scroll to the arrows
function addScrollTo(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();

    scrollTo(
      document.getElementById(
        element.href.substr(element.href.indexOf('#') + 1)
      ).offsetTop
    ).then(() => (document.location = element.href));
  });
}

document.querySelectorAll('.arrow').forEach(addScrollTo);

/* getting my whereabouts */
const getLocation = () =>
  fetch('https://where-is-haroen.now.sh').then(res => res.json());

async function updateLoc() {
  const { city, country } = await getLocation();
  const locationEl = document.getElementById('location');
  const text = document.createTextNode(`${city},\u0020${country}\u0020`);
  locationEl.replaceChild(text, locationEl.firstChild);

  const info = document.createElement('a');
  info.classList.add('question', 'icons');
  info.title = 'made with the Foursquare API';
  info.target = '_blank';
  info.rel = 'noreferrer';
  info.href = 'https://github.com/Haroenv/where-am-i';
  locationEl.appendChild(info);
}

updateLoc();

/* konami code */
/*
 * Konami-JS ~
 * :: Now with support for touch events and multiple instances for
 * :: those situations that call for multiple easter eggs!
 * Code: http://konami-js.googlecode.com/
 * Examples: http://www.snaptortoise.com/konami-js
 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
 * Version: 1.4.2 (9/2/2013)
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
 */
function Konami(callback) {
  var konami = {
    addEvent: function(obj, type, fn, ref_obj) {
      if (obj.addEventListener) obj.addEventListener(type, fn, false);
      else if (obj.attachEvent) {
        // IE
        obj['e' + type + fn] = fn;
        obj[type + fn] = function() {
          obj['e' + type + fn](window.event, ref_obj);
        };
        obj.attachEvent('on' + type, obj[type + fn]);
      }
    },
    input: '',
    pattern: '38384040373937396665',
    load: function(link) {
      this.addEvent(
        document,
        'keydown',
        function(e, ref_obj) {
          if (ref_obj) konami = ref_obj; // IE
          konami.input += e ? e.keyCode : event.keyCode;
          if (konami.input.length > konami.pattern.length)
            konami.input = konami.input.substr(
              konami.input.length - konami.pattern.length
            );
          if (konami.input == konami.pattern) {
            konami.code(link);
            konami.input = '';
            e.preventDefault();
            return false;
          }
        },
        this
      );
      this.iphone.load(link);
    },
    code: function(link) {
      window.location = link;
    },
    iphone: {
      start_x: 0,
      start_y: 0,
      stop_x: 0,
      stop_y: 0,
      tap: false,
      capture: false,
      orig_keys: '',
      keys: [
        'UP',
        'UP',
        'DOWN',
        'DOWN',
        'LEFT',
        'RIGHT',
        'LEFT',
        'RIGHT',
        'TAP',
        'TAP',
      ],
      code: function(link) {
        konami.code(link);
      },
      load: function(link) {
        this.orig_keys = this.keys;
        konami.addEvent(document, 'touchmove', function(e) {
          if (e.touches.length == 1 && konami.iphone.capture == true) {
            var touch = e.touches[0];
            konami.iphone.stop_x = touch.pageX;
            konami.iphone.stop_y = touch.pageY;
            konami.iphone.tap = false;
            konami.iphone.capture = false;
            konami.iphone.check_direction();
          }
        });
        konami.addEvent(
          document,
          'touchend',
          function(evt) {
            if (konami.iphone.tap == true) konami.iphone.check_direction(link);
          },
          false
        );
        konami.addEvent(document, 'touchstart', function(evt) {
          konami.iphone.start_x = evt.changedTouches[0].pageX;
          konami.iphone.start_y = evt.changedTouches[0].pageY;
          konami.iphone.tap = true;
          konami.iphone.capture = true;
        });
      },
      check_direction: function(link) {
        x_magnitude = Math.abs(this.start_x - this.stop_x);
        y_magnitude = Math.abs(this.start_y - this.stop_y);
        x = this.start_x - this.stop_x < 0 ? 'RIGHT' : 'LEFT';
        y = this.start_y - this.stop_y < 0 ? 'DOWN' : 'UP';
        result = x_magnitude > y_magnitude ? x : y;
        result = this.tap === true ? 'TAP' : result;

        if (result == this.keys[0])
          this.keys = this.keys.slice(1, this.keys.length);
        if (this.keys.length === 0) {
          this.keys = this.orig_keys;
          this.code(link);
        }
      },
    },
  };

  typeof callback === 'string' && konami.load(callback);
  if (typeof callback === 'function') {
    konami.code = callback;
    konami.load();
  }

  return konami;
}

new Konami(() => {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://s.haroen.me/konami.css';
  head.insertBefore(link, head.firstChild);
});
