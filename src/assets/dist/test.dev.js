"use strict";

var stylus = require('stylus');

var str = "\n.bad\n    color: #fff\n    background: #000\nbutton\n      background-color: tomato\n      font-size: 34px\n      color: white";
stylus.render(str, {
  filename: 'nesting.css'
}, function (err, css) {
  if (err) throw err;
  console.log(css);
});