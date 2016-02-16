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

Tree.prototype.traverse = function(callback) {
    (function recurse(node){
        for(var i = 0; i < node.children.length; i++) {
            recurse(node.children[i]);
        }
        callback(node);
    })(this);
}

var tree = new Tree(5);
tree.add(6, 5, tree.traverse);
tree.traverse(function(node){
    console.log(node.value);
});
console.log(tree);
