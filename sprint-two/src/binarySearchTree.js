var BinarySearchTree = function(value) {
  var tree = Object.create(Object);

  tree.value = value;
  tree.left = null;
  tree.right = null;

  _.extend(tree, bTreeMethods);
  return tree;
};

bTreeMethods = {};

bTreeMethods.insert = function(value) {
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

bTreeMethods.contains = function(value) {
  var found = false;

  if (this.value === value) {
    found = true;
  } else if (value < this.value && this.left !== null) {
    found = this.left.contains(value);
  } else if (this.right !== null) {
    found = this.right.contains(value);
  }

  return found;
}

bTreeMethods.depthFirstLog = function(cb) {
  //iterate over each tree node calling cb
  cb(this.value);

  if (this.left !== null) {
    this.left.depthFirstLog(cb);
  }

  if (this.right !== null) {
    this.right.depthFirstLog(cb);
  }
}

bTreeMethods.breadthFirstLog = function(cb) {
    //iterate over each tree node calling cb

    var queue = [];
    queue.push(this);
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].left) {
        queue.push(queue[i].left);
      }
      if (queue[i].right) {
        queue.push(queue[i].right);
      }
    }

    _.each(queue, function(obj){
      cb(obj.value);
    });
  }
  /*
   * Complexity: What is the time complexity of the above functions?
   */