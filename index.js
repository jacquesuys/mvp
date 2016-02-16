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

Tree.prototype.traverse = function(callback) {
    (function recurse(node){
        for(var i = 0; i < node.children.length; i++) {
            recurse(node.children[i]);
        }
        callback(node);
    })(this);
}

function findIndex(arr, value) {
    var index;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].value === value) {
            index = i;
        }
    }

    return index;
}

var tree = new Tree(5);
tree.add(6, 5, tree.traverse);
tree.traverse(function(node){
    console.log(node.value);
});
console.log(tree);

tree.remove(6, 5, tree.traverse);
console.log(tree);
