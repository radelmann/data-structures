var dLinkedList = function() {
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
        list.tail.next.prev = list.tail;
        list.tail = list.tail.next;
      }
  };

  list.removeHead = function() {
    var value = list.head.value;
    if(list.head.next === null){
      list.head = null;
      list.tail = null
    } else {
      list.head = list.head.next;
      list.head.prev = null;
    }
    
    return value;
  };

  list.addToHead = function(value){
    var node = Node(value);
      //need to assign value for key
      if (list.head===null) {
        list.head = node;
        list.tail = node;
      } else {
        list.head.prev = node;
        list.head.prev.next = list.head;
        list.head = list.head.prev;
      }
  }

  list.removeTail = function(){
    var value = list.tail.value;

    if(list.head.next === null){
      list.head = null;
      list.tail = null
    } else {
      list.tail = list.tail.prev;
      list.tail.next = null;
    }
  
    return value;
  }

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
  node.prev = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
