var BinarySearchTree = function(value) {
  var tree = Object.create(Object);

  tree.value = value;
  tree.left = null;
  tree.right = null;

  _.extend(tree, treeMethods);
  return tree;
};

treeMethods = {};

treeMethods.insert = function (value) {
  if (value < this.value) {
    if (this.left === null) {
      this.left = BinarySearchTree(value);
      } else {
      this.left.insert(value);
    }
  } else {
    if (this.right === null) {
      this.right = BinarySearchTree(value);
    } else {
      this.right.insert(value);
    }
  }
}

treeMethods.contains = function (value) {
  var found = false;

  if (this.value===value) {
    found = true;
  } else if (value < this.value && this.left !== null) {
    found = this.left.contains(value);
  } else if (this.right !== null) {
    found = this.right.contains(value);
  }

  return found;
}

treeMethods.depthFirstLog = function (cb) {
  //iterate over each tree node calling cb
  cb(this.value);

  if (this.left!==null) {
    this.left.depthFirstLog(cb);
  }
  
  if (this.right!==null) {
    this.right.depthFirstLog(cb);
  }
}
/*
 * Complexity: What is the time complexity of the above functions?
 */
