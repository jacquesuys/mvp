var Pet = function(name) {
  this.name = name;
  this.children = [];
  this.parent = null;
};

Pet.prototype.add = function(name, target, traversal) {
  var child = new Pet(name);
  var parent = null;
  
  var track = function(value, target) {
    if (node.name === target) {
      parent = node;
    }
  };

  this.contains(track, traversal);

  if (parent) {
    parent.children.push(child);
    child.parent = parent.name;
  } else {
    throw new Error('Can\'t find target node, to add');
  }
};

Pet.prototype.contains = function(callback, traversal) {
  traversal.call(this, callback);
};

Pet.prototype.remove = function(target) {
  if(!this.children) { return; }
  if(this.value === target) {}
  for(var i = 0; i < this.children.length; i++) {
    var child = this.children[i];
    child.remove(target);
  }
};

Pet.prototype.DPS = function(callback){

  if(!this.children) { return; }

  for(var i = 0; i < this.children.length; i++) {
    var child = this.children[i];
    child.DPS(callback);
  }
};

var spike = new Pet("spike");

spike.add("ben");

spike.DPS();

var arr = [1, [2, [3, [4, 5], 6], 7]];

var printer = function(val, spacer) {
   if ( Array.isArray(val) ) {
       for (var i = 0; i < val.length; i++) {
          printer( val[i], '  ' + spacer + '-');
       }
   } else {
       console.log(spacer + ' (' + val + ')');
   }
}

printer(arr, '+-');
