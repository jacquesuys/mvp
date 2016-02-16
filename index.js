var Tree = function(value) {
  this.value = value;
  this.children = [];
  this.parent = null;
};

Tree.prototype.contains = function(callback, traverse){
  traverse.call(this, callback);
}

Tree.prototype.add = function(value, target, traverse) {
  var child = new Tree(value);
  var parent = null;

  var callback = function(node) {
    if(node.value == target) {
      parent = node;
    }
  };

  this.contains(callback, traverse);

  if (parent) {
    parent.children.push(child);
    child.parent = parent.value;
  } else {
    throw new Error('Can\'t find target node');
  }
}

Tree.prototype.remove = function(value, target, traverse) {
  var parent = null;
  var index;
  var callback = function(node) {
    if(node.value === target) {
      parent = node;
    }
  }

  this.contains(callback, traverse);

  if (parent) {
    index = findIndex(parent.children, value);

    if (index === undefined) {
      throw new Error('Target node doesn\'t exist');
    } else {
      parent.children.splice(index, 1);
    }
  } else {
    throw new Error('No such parent');
  }
}

Tree.prototype.traverseDFS = function(callback) {
  (function recurse(node){
    for(var i = 0; i < node.children.length; i++) {
      recurse(node.children[i]);
    }
    callback(node);
  })(this);
}

Tree.prototype.traverseBFS = function(callback) {
  var queue = new Queue();

  queue.enqueue(this);

  currentTree = queue.dequeue();

  while(currentTree){
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }

    callback(currentTree);
    currentTree = queue.dequeue();
  }
};

function findIndex(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].value === value) {
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
