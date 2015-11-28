var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var queue = {};

  queue.count = 0;
  queue.storage = {};
  queue.beginning = 1;
  queue.end = 0;

  _.extend(queue, queueMethods);
  return queue;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.end++;
  this.storage[this.end] = value;
  this.count++;
}

queueMethods.dequeue = function() {
  if (this.count > 0) {
    var value = this.storage[this.beginning];
    delete this.storage[this.beginning];
    this.beginning++;
    this.count--;
    return value;
  }
  return;
}

queueMethods.size = function() {
  return this.count;
}
