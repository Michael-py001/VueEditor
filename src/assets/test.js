var stylus = require('stylus');
let str = `
.bad
    color: #fff
    background: #000
    button
        background-color: tomato
        font-size: 34px
        color: white`
stylus.render( str,{ filename: './test.stylus' }, function(err, css){
  if (err) throw err;
  console.log(css);
});