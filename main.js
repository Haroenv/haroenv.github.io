(function() {
"use strict";

/* random description generator */
var descriptions = [
  "student",
  "git lover",
  "open sourcer",
  "programmer",
  "nerd",
  "space enthousiast",
  "poweruser",
  "meme",
  "Belgian",
  "<a href='https://bullg.it'>gitch</a>"
];

var oldIndex = 0;

//generate a new description
function generate() {
  var index1 = Math.floor(Math.random() * descriptions.length);
  if (index1 === oldIndex) {
    if (index1 === 0) {
      index1 = descriptions.length - 1;
    } else {
      index1--;
    }
  }
  var desc = descriptions[index1];
  document.getElementById("generated").innerHTML = desc;
  oldIndex = index1;
}


document.getElementById("generator").addEventListener("click",function() {
  generate();
});

/* making fallback for meter element work */
var meters = document.getElementsByTagName('meter');
for (var i = 0; i < meters.length; i++) {
  if (meters[i].clientHeight === 0) {
    meters[i].style.border = "none";
  }
}


/* scrolling to the next element */

// https://gist.github.com/james2doyle/5694700
// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function(){
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

function scrollTo(to, callback, duration) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }
  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 20;
  duration = (typeof(duration) === "undefined") ? 500 : duration;
  var animateScroll = function() {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof(callback) === "function") {
        // the animation is done so lets callback
        callback();
      }
    }
  };
  animateScroll();
}

//adding the scroll to the arrows
function addScrollTo(element) {
  element.addEventListener("click",function(e) {
    scrollTo(document.getElementById(element.href.substr(element.href.indexOf("#")+1)).offsetTop,function() {
      document.location = element.href;
    });
    e.preventDefault();
  });
};


Array.from(document.getElementsByClassName("arrow")).forEach(addScrollTo);

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
var Konami = function (callback) {
  var konami = {
    addEvent: function (obj, type, fn, ref_obj) {
      if (obj.addEventListener)
        obj.addEventListener(type, fn, false);
      else if (obj.attachEvent) {
        // IE
        obj["e" + type + fn] = fn;
        obj[type + fn] = function () {
          obj["e" + type + fn](window.event, ref_obj);
        }
        obj.attachEvent("on" + type, obj[type + fn]);
      }
    },
    input: "",
    pattern: "38384040373937396665",
    load: function (link) {
      this.addEvent(document, "keydown", function (e, ref_obj) {
        if (ref_obj) konami = ref_obj; // IE
        konami.input += e ? e.keyCode : event.keyCode;
        if (konami.input.length > konami.pattern.length)
          konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
        if (konami.input == konami.pattern) {
          konami.code(link);
          konami.input = "";
          e.preventDefault();
          return false;
        }
      }, this);
      this.iphone.load(link);
    },
    code: function (link) {
      window.location = link;
    },
    iphone: {
      start_x: 0,
      start_y: 0,
      stop_x: 0,
      stop_y: 0,
      tap: false,
      capture: false,
      orig_keys: "",
      keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
      code: function (link) {
        konami.code(link);
      },
      load: function (link) {
        this.orig_keys = this.keys;
        konami.addEvent(document, "touchmove", function (e) {
          if (e.touches.length == 1 && konami.iphone.capture == true) {
            var touch = e.touches[0];
            konami.iphone.stop_x = touch.pageX;
            konami.iphone.stop_y = touch.pageY;
            konami.iphone.tap = false;
            konami.iphone.capture = false;
            konami.iphone.check_direction();
          }
        });
        konami.addEvent(document, "touchend", function (evt) {
          if (konami.iphone.tap == true) konami.iphone.check_direction(link);
        }, false);
        konami.addEvent(document, "touchstart", function (evt) {
          konami.iphone.start_x = evt.changedTouches[0].pageX;
          konami.iphone.start_y = evt.changedTouches[0].pageY;
          konami.iphone.tap = true;
          konami.iphone.capture = true;
        });
      },
      check_direction: function (link) {
        x_magnitude = Math.abs(this.start_x - this.stop_x);
        y_magnitude = Math.abs(this.start_y - this.stop_y);
        x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
        y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
        result = (x_magnitude > y_magnitude) ? x : y;
        result = (this.tap === true) ? "TAP" : result;

        if (result == this.keys[0]) this.keys = this.keys.slice(1, this.keys.length);
        if (this.keys.length === 0) {
          this.keys = this.orig_keys;
          this.code(link);
        }
      }
    }
  }

  typeof callback === "string" && konami.load(callback);
  if (typeof callback === "function") {
    konami.code = callback;
    konami.load();
  }

  return konami;
};

var easter_egg = new Konami(function() {
  var head = document.getElementsByTagName("head")[0],
  link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://s.haroen.me/konami.css";
  head.insertBefore(link, head.childNodes[0]);
  return link;
});

}());
