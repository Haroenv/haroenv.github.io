//random generator
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
  "<a href='http://bullg.it'>gitch</a>"
];

var oldIndex = 0;

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

//scrolling
function animate(from, to, time) {
  var start = new Date().getTime(),
    timer = setInterval(function () {
      var step = Math.min(1, (new Date().getTime() - start) / time);
      document.body["scrollTop"] = (from + step * (to - from)) + "";
      if (step === 1) {
        clearInterval(timer);
      }
    }, 25);
  document.body.style["scrollTop"] = from + "";
}

function goTo(from, to) {
  animate(document.getElementById(from).offsetTop, document.getElementById(to).offsetTop, 500);
  return false;
}

//google analytics
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-27277115-3', 'auto');
ga('send', 'pageview');

//konami code
function loadcss(url) {
  var head = document.getElementsByTagName('head')[0],
  link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  head.insertBefore(link, head.childNodes[0]);
  return link;
}
function cssSwitch() {
  loadcss('/s/konami.css');
}

var easter_egg = new Konami(cssSwitch);

