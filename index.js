var Pet = function(name) {
  this.name = name;
  this.children = [];
};

Pet.prototype.add = function(name) {
  var child = new Pet(name);
  this.children.push(child);
};

Pet.prototype.contains = function(target) {
  if ( this.name === target ) {
    return true;
  }
  for ( var i = 0; i < this.children.length; i++ ) {
    var child = this.children[i];
    if (child.contains(target)) {
      return true;
    }
  }
  return false;
};

Pet.prototype.DPS = function(callback){
  console.log(this.name);

  if(!this.children) { return; }

  for(var i = 0; i < this.children.length; i++) {
    var child = this.children[i];
    child.DPS(callback);
  }
}
var spike = new Pet("spike");

spike.add("ben");

spike.DPS();
