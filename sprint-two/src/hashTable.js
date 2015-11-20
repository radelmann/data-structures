var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit); //Returns a empty object with limit
};

HashTable.prototype.insert = function(k, v) {
  if (this._count === this._limit) {
    this._limit = this._limit * 2;
  }

  var index = getIndexBelowMaxForKey(k, this._limit);
  
  var bucket = this._storage.get(index);
  bucket = bucket || [];
  bucket.push([k,v]);
  this._storage.set(index, bucket);
  
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  
  var bucket = this._storage.get(index);
  bucket = bucket || [];
  var value;

  _.each(bucket, function(tuple) {
    if (tuple[0]===k) {
      value = tuple[1];
    }
  });
  
  return value;
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  
  var bucket = this._storage.get(index);
  var deleted;

  _.each(bucket, function(tuple,index,collection) {
    if (tuple[0]===k) {
       deleted = collection.splice(index,1);
    }
  });
  
  return deleted;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
