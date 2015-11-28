var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;
  var beginning = 1;
  var end = 0;
  // Implement the methods below
  someInstance.enqueue = function(value) {
    size++;
    end++;
    storage[end] = value;
  };

  someInstance.dequeue = function() {
    if (size > 0) {
      var value = storage[beginning];
      delete storage[beginning];
      beginning++;
      size--;
      return value;
    }
    return;
  };

  someInstance.size = function() {
    return size;
  };

  return someInstance;
};
