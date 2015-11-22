var BinarySearchTree = function(value) {
  var tree = Object.create(Object);

  tree.value = value;
  tree.left = null;
  tree.right = null;
  tree.nodeCount = 1;

  _.extend(tree, bTreeMethods);
  return tree;
};

bTreeMethods = {};

bTreeMethods.checkBalance = function() {
  //rebalance as soon as the max depth is 
  //more than twice the minimum depth
  var minDepth = this.calcMinDepth();

  if (this.nodeCount > 2 * minDepth) {
    //rebalance
    var array = [];
    var func = function(value) {
      array.push(value);
    };
    this.breadthFirstLog(func);

    var mid = Math.floor(array.length / 2);
    var newTree = BinarySearchTree(mid)

    var i = 1;
    
    while (newTree.nodeCount < this.nodeCount) {
      if (array[mid - i] !== null) newTree.insert(array[mid - i]);
      if (array[mid + i] !== null) newTree.insert(array[mid + i]);
      i++;
    }
    this = newTree;
  }
}

bTreeMethods.calcMinDepth = function() {

  var minDepth = function(node) {
    if (node === null) return 0;

    if (node.left === null && node.right === null) {
      return 1;
    }

    if (!node.left) {
      return minDepth(node.right) + 1;
    }

    if (!node.right) {
      return minDepth(node.left) + 1;
    }

    return Math.min(minDepth(node.left), minDepth(node.right));
  }

  return minDepth(this);
}

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
  this.nodeCount + 1;
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

    _.each(queue, function(obj) {
      cb(obj.value);
    });
  }
  /*
   * Complexity: What is the time complexity of the above functions?
   */