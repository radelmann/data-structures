var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;
  
  list.length = 0;

  list.addToTail = function(value) {
      var node = Node(value);
      //need to assign value for key
      list.length++;
      list[list.length] = node;
      
      if (list.head===null) {
        list.head = node;
      }
      
      if (list.tail !== null) {
        node.next = list.tail;
        list.tail = node;  
      }
  };

  list.removeHead = function() {
  };

  list.contains = function(target) {
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
