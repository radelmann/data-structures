var HashTable = function() {
  this._count = 0;
  this._limit = 8;
  this._storage = LimitedArray(this._limit); //Returns a empty object with limit
};

HashTable.prototype.checkResize = function() {
  if (this._count / this._limit > .75) {
    this.resize(this._limit * 2);
  } else if (this._count / this._limit < .25) {
    this.resize(this._limit / 2);
  }
}

HashTable.prototype.resize = function(newLimit) {
  var oldStorage = this._storage;
  var ht = this;
  this._storage = LimitedArray(newLimit);
  this._limit = newLimit;
  this._count = 0;
  oldStorage.each(function(bucket) {
    _.each(bucket, function(tuple) {
      ht.insert.call(ht, tuple[0], tuple[1], false);
    });
  });
}

HashTable.prototype.insert = function(k, v, check) {
  this._count++;
  check = (check === undefined) ? true : false;

  var index = getIndexBelowMaxForKey(k, this._limit);

  var bucket = this._storage.get(index);
  bucket = bucket || [];
  bucket.push([k, v]);
  this._storage.set(index, bucket);

  if (check) {
    this.checkResize();
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  var bucket = this._storage.get(index);
  bucket = bucket || [];
  var value;

  _.each(bucket, function(tuple) {
    if (tuple[0] === k) {
      value = tuple[1];
    }
  });

  return value;
};

HashTable.prototype.remove = function(k) {
  this._count--;

  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  var deleted;

  _.each(bucket, function(tuple, index, collection) {
    if (tuple[0] === k) {
      deleted = collection.splice(index, 1);
    }
  });

  // check resize
  this.checkResize();
  return deleted;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */