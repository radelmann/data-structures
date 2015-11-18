var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  var size = 0;
  someInstance.enqueue = function(value) {
    size+=1;
    storage[size] = value;
  };

  someInstance.dequeue = function() {
    if(size > 0){
      var value = storage[1];
      for(var key in storage){
      storage[key-1] = storage[key];
      }
      delete storage[size];
      size--;
      return value;
    }
    
    return 
  };

  someInstance.size = function() {
    return size;
  };

  return someInstance;
};
