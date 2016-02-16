var Pet = function(name) {
  this.name = name;
  this.children = [];
  this.parent = null;
};

Pet.prototype.contains = function(callback, traverse){
  traverse.call(this, callback);
}

Pet.prototype.add = function(name, target, traverse) {
  var child = new Pet(name);
  var parent = null;

  var callback = function(node) {
    if(node.name == target) {
      parent = node;
    }
  };

  this.contains(callback, traverse);

  if (parent) {
    parent.children.push(child);
    child.parent = parent.name;
  } else {
    throw new Error('Can\'t find target node');
  }
}

Pet.prototype.remove = function(name, target, traverse) {
  var parent = null;
  var index;
  var callback = function(node) {
    if(node.name === target) {
      parent = node;
    }
  }

  this.contains(callback, traverse);

  if (parent) {
    index = findIndex(parent.children, name);

    if (index === undefined) {
      throw new Error('Target node doesn\'t exist');
    } else {
      parent.children.splice(index, 1);
    }
  } else {
    throw new Error('No such parent');
  }
}

Pet.prototype.traverseDFS = function(callback) {
  (function recurse(node){
    for(var i = 0; i < node.children.length; i++) {
      recurse(node.children[i]);
    }
    callback(node);
  })(this);
}

Pet.prototype.traverseBFS = function(callback) {
  var queue = new Queue();

  queue.enqueue(this);

  currentPet = queue.dequeue();

  while(currentPet){
    for (var i = 0, length = currentPet.children.length; i < length; i++) {
      queue.enqueue(currentPet.children[i]);
    }

    callback(currentPet);
    currentPet = queue.dequeue();
  }
};

function findIndex(arr, name) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      return i;
    }
  }
}

function Queue() {
  this._oldestIndex = 1;
  this._newestIndex = 1;
  this._storage = {};
}

Queue.prototype.size = function() {
  return this._newestIndex - this._oldestIndex;
};

Queue.prototype.enqueue = function(data) {
  this._storage[this._newestIndex] = data;
  this._newestIndex++;
};

Queue.prototype.dequeue = function() {
  var oldestIndex = this._oldestIndex;
  var newestIndex = this._newestIndex;
  var deletedData;

  if (oldestIndex !== newestIndex) {
    deletedData = this._storage[oldestIndex];
    delete this._storage[oldestIndex];
    this._oldestIndex++;

    return deletedData;
  }
};
