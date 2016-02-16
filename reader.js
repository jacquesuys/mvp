var fs = require('fs');
var msg = '';

var interpret = function(file, callback){
  fs.readFile(file, 'utf8', callback);
};

interpret(__dirname + '/goals.js', function(err, data) {
  if (err) { throw err; }
  fs.writeFile('test.txt', data, function(err){
    if (err) throw err;
    console.log('It\'s saved!');
  });
});
