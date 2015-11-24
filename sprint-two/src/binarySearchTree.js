var BinarySearchTree = function(value) {
  var tree = Object.create(Object);
  _.extend(tree, bTreeMethods);
  tree._init(value);
  return tree;
};

bTreeMethods = {};

bTreeMethods._init = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.nodeCount = 1;
}

bTreeMethods.rebalance = function() {
  //rebalance if the max depth is 
  //more than twice the minimum depth
  var minDepth = this._calcMinDepth();

  if (this.nodeCount > 2 * minDepth) {
    //rebalance
    var array = [];
    var func = function(value) {
      array.push(value);
    };
    this.breadthFirstLog(func);

    var mid = Math.floor(array.length / 2);
    var nodeCount = this.nodeCount;
    this._init(array[mid]);

    var i = 1;
    while (this.nodeCount < nodeCount) {
      if (array[mid - i] !== undefined) this.insert(array[mid - i]);
      if (array[mid + i] !== undefined) this.insert(array[mid + i]);
      i++;
    }
  }
}

bTreeMethods._calcMinDepth = function() {
  var minDepth = function(node) {
    if (node === null) return 0;
    if ((node.left === null) || (node.right === null)) {
      return 1 + Math.max(minDepth(node.left), minDepth(node.right));
    }
    return 1 + Math.min(minDepth(node.left), minDepth(node.right));
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

  this.nodeCount++;
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
