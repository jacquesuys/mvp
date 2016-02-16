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

Pet.prototype.remove = function(name, target, traversal) {
  var parent = null;
  var index;
  var track = function(node) {
    if (node.name === target) {
      parent = node;
    }
  }

  this.contains(track, traversal);

  if (parent) {
    index = findIndex(parent.children, value);

    if (index === undefined) {
      throw new Error('Can\'t find target node, to remove');
    } else {
      parent.children.splice(index, 1);
    }
  } else {
    throw new Error('No such parent');
  }
};

Pet.prototype.traverseDPS = function(callback) {
  (function recurse(node) {
    for (var i = 0; i < node.children.length; i++) {
      recurse(node.children[i]);
    }
    callback(node);
  })(this);
};

function findIndex(arr, value) {
  var index;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value === value) {
      index = i;
    }
  }

  return index;
}
