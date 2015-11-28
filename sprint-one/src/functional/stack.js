var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;

  // Implement the methods below
  someInstance.push = function(value) {
    size++;
    storage[size] = value;
  };

  someInstance.pop = function() {
    if (size > 0) {
      var value = storage[size];
      delete storage[size];
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
