var fs = require('fs');
var output = '';

var interpret = function(file, callback){
  fs.readFileSync(file, 'utf8', callback);
  fs.writeFileSync('test.txt', output, function(err){
    if (err) console.log(err);
    console.log('It\'s saved!');
  });
};

interpret(__dirname + '/goals.js', function(err, data) {
  if (err) console.log(err);

  // sub routine
  var printer = function(val, spacer) {
     if ( Array.isArray(val) ) {
         spacer += '-';
         for (var i = 0; i < val.length; i++) {
            printer( val[i], spacer );
         }
     } else {
         output += (spacer + ' ' + val);
     }
  }

  printer(data, '');
});
