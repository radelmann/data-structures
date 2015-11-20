
var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit); //Returns a empty object with limit
};

HashTable.prototype.insert = function(k, v) {
  if (this._count===this._limit) {
    this._limit = this._limit*2;
  }
  
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  bucket = bucket || {};
  bucket[k] = v;
  this._storage.set(index, bucket);
  this._count++;
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  return bucket[k];
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  delete bucket[k];
  this._count--;
 };

/*
 * Complexity: What is the time complexity of the above functions?
 */