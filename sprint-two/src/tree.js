var Tree = function(value, parent) {
  var newTree = {};
  newTree.value = value;
  newTree.parent = parent || null;

  // your code here
  newTree.children = []; // fix me
  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var node = Tree(value, this);
  this.children.push(node);
};

treeMethods.removeParent = function() {
  var p = this.parent;
  this.parent = null;
  _.each(p.children, function(node, index, collection) {
    if (node.value === this.value) {
      collection.splice(index, 1);
    }
  }.bind(this));
}

treeMethods.contains = function(target) {
  var found = false;

  var searchTree = function(node) {
    if (node.value === target) {
      found = true;
    } else if (node.children.length > 0) {
      _.each(node.children, searchTree);
    }
  }
  searchTree(this);
  return found;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */