var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.count = 0;
  this.storage = {};
  this.beginning = 1;
  this.end = 0;
};

Queue.prototype.enqueue = function(value) {
  this.end++;
  this.storage[this.end] = value;
  this.count++;
}

Queue.prototype.dequeue = function() {
  if (this.count > 0) {
    var value = this.storage[this.beginning];
    delete this.storage[this.beginning];
    this.beginning++;
    this.count--;
    return value;
  }
  return;
}

Queue.prototype.size = function() {
  return this.count;
}
