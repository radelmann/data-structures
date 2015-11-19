var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;
  
  list.addToTail = function(value) {
      var node = Node(value);
      //need to assign value for key
      if (list.head===null) {
        list.head = node;
        list.tail = node;
      } else {
        list.tail.next = node;
        list.tail = node;
      }
  };

  list.removeHead = function() {
    var value = list.head.value;
    list.head = list.head.next;
    return value;
  };

  list.contains = function(target) {
    var found = false;

    var searchNode = function(node) {
      if (target === node.value) {
        found = true;
      } else if (node.next !== null) {
        searchNode(node.next);
      }
    }
    
    searchNode(list.head);

    return found;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
