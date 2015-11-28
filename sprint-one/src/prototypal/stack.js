var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var stack = Object.create(stackMethods);
  stack.count = 0;
  stack.storage = {};

  return stack;
};

var stackMethods = {};

stackMethods.push = function(value) {
  this.count++;
  this.storage[this.count] = value;
}

stackMethods.pop = function() {
  if (this.count > 0) {
    var value = this.storage[this.count];
    delete this.storage[this.count];
    this.count--;
    return value;
  }
  return;
}

stackMethods.size = function() {
  return this.count;
}
