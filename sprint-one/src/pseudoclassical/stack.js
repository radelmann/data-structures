var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
  this.count = 0;
};

Stack.prototype.size = function() {
  return this.count;
};

Stack.prototype.push = function(value) {
  this.count++;
  this.storage[this.count] = value;
};

Stack.prototype.pop = function(value) {
  if (this.count>0) {
    var value = this.storage[this.count];
    delete this.storage[this.count];
    this.count--;
    return value;
  }
};