var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.

  this.storage = {};
  this.count = 0;

};

Queue.prototype.size = function() {
  return this.count;
};

Queue.prototype.enqueue = function(value) {
  this.count++;
  this.storage[this.count] = value;
};

Queue.prototype.dequeue = function(value) {
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
