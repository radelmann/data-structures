

// ------------------------
// Instantiate a new graph
var Graph = function() {
  //need array for connections ?
  //if only one connection it is an edge
  //need to hold value
  this.nodes = []; 

};

// ------------------------
// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  var n = {};
  n.edges = [];
  n.value = node; 
  this.nodes.push(n);
}

// ------------------------
// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return _.reduce(this.nodes,function(found, currentNode) {
    if (!found) {
      if (currentNode.value === node) {
        found = true;
      } 
      return found;
    }
  },false);
};

// ------------------------
// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  var nodes = this.nodes;
  _.each(this.nodes, function(obj, key, collection) {
    if (node === obj.value) {
      collection.splice(key,1);
      nodes = collection.slice();
    };
  });
  this.nodes = nodes;
};

// ------------------------
// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  var found = false;
  _.each(this.nodes, function(obj) {
    if (fromNode === obj.value) {
      found = _.contains(obj.edges, toNode);
    }
  });
  return found;
};

// ------------------------
// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  _.each(this.nodes, function(obj) {
    if (fromNode === obj.value) {
      obj.edges.push(toNode);
    }
    if (toNode === obj.value) {
      obj.edges.push(fromNode);
    }
  });
};

// ------------------------
// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  _.each(this.nodes, function(obj,index) {
    if (fromNode === obj.value) {
      obj.edges.splice(_.indexOf(obj.edges, toNode),1);
    }
    if (toNode === obj.value) {
      obj.edges.splice(_.indexOf(obj.edges, fromNode),1);
    }
  });
};

// ------------------------
// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  _.each(this.nodes, function(obj){
    cb(obj.value);
  })
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


