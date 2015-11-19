

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit); //Returns a empty object with limit
};

HashTable.prototype.getIndexBelowMaxForKey = getIndexBelowMaxForKey;

HashTable.prototype.insert = function(k, v) {
  var index = this.getIndexBelowMaxForKey(k, this._limit);
  this._storage.set(index, v);
};

HashTable.prototype.retrieve = function(k) {
  var index = this.getIndexBelowMaxForKey(k, this._limit);
  return this._storage.get(index);

};

HashTable.prototype.remove = function(k) {
  var index = this.getIndexBelowMaxForKey(k, this._limit);
  this._storage.set(index, undefined);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


