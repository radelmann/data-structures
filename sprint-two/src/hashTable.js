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
  this._storage = LimitedArray(newLimit);
  this._limit = newLimit;
  this._count = 0;
  oldStorage.each(function(bucket) {
    _.each(bucket, function(tuple) {
      this.insert(tuple[0], tuple[1], false);
    }.bind(this));
  }.bind(this));
}

HashTable.prototype.insert = function(k, v, check) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  bucket = bucket || [];

  //check if exists, then update
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      tuple[1] = v;
      return;
    }
  };

  bucket.push([k, v]);
  this._storage.set(index, bucket);

  this._count++;
  check = (check === undefined) ? true : false;
  if (check) {
    this.checkResize();
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  bucket = bucket || [];

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      return tuple[1];
    }
  };

  return;
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  var deleted;

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];
    if (tuple[0] === k) {
      deleted = i;
      break;
    }
  };

  deleted = bucket.splice(deleted, 1);
  this._storage.set(index, bucket);  

  this._count--;
  this.checkResize();
  return deleted;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
