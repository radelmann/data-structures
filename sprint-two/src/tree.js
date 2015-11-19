var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me
  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var node = Tree(value);
  this.children.push(node);
};

treeMethods.contains = function(target) {
  var found = false;

  var searchTree = function (node) {
    if (node.value === target) {
      found = true;
    } else if (node.children.length>0) {
      _.each(node.children, searchTree);
    }
  }
  searchTree(this);
  return found;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
