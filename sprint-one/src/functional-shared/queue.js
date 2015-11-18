var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var newQueue = {};
  
  newQueue.storage = {};
  newQueue.count = 0;

  _.extend(newQueue, queueMethods);

  return newQueue;
};

queueMethods = {};

queueMethods.size = function() {
  return this.count;
};

queueMethods.enqueue = function(value) {
  this.count++;
  this.storage[this.count] = value;
};

queueMethods.dequeue = function(value) {
  if (this.count>0) {
    var value = this.storage[1];
    for(var key in this.storage){
      this.storage[key-1] = this.storage[key]
    }
    delete this.storage[this.count];
    this.count--;
    return value;
  }
};

