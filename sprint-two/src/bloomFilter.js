var bloomFilter = function(m, k) {
  this._m = m;
  this._k = k;
  this._storage = [];
  this._init();
};

bloomFilter.prototype._init = function() {
  for (var i = 0; i < this._m; i++) {
    this._storage[i] = false;
  };
}

bloomFilter.prototype.insert = function(value) {
  var hashArray = this._hash(value);

  for (var i = 0; i < hashArray.length; i++) {
    this._storage[hashArray[i]] = true;
  }
}

bloomFilter.prototype.test = function(value) {
  var hashArray = this._hash(value);

  for (var i = 0; i < hashArray.length; i++) {
    if (!this._storage[hashArray[i]]) {
      return false;
    }
  }
  return true;
}

bloomFilter.prototype._hash = function(value) {
  //return array of hash indexes for input value, using this._m and this._k
    value += '';
  // Fowler/Noll/Vo hashing.
  function fnv_1a(v) {
    var a = 2166136261;
    for (var i = 0, n = v.length; i < n; ++i) {
      var c = v.charCodeAt(i),
        d = c & 0xff00;
      if (d) a = fnv_multiply(a ^ d >> 8);
      a = fnv_multiply(a ^ c & 0xff);
    }
    return fnv_mix(a);
  }

  // a * 16777619 mod 2**32
  function fnv_multiply(a) {
    return a + (a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24);
  }

  // One additional iteration of FNV, given a hash.
  function fnv_1a_b(a) {
    return fnv_mix(fnv_multiply(a));
  }

  // See https://web.archive.org/web/20131019013225/http://home.comcast.net/~bretm/hash/6.html
  function fnv_mix(a) {
    a += a << 13;
    a ^= a >>> 7;
    a += a << 3;
    a ^= a >>> 17;
    a += a << 5;
    return a & 0xffffffff;
  }

  var k = this._k,
    m = this._m,
    r = [],
    a = fnv_1a(value),
    b = fnv_1a_b(a),
    x = a % m;
  for (var i = 0; i < k; ++i) {
    r[i] = x < 0 ? (x + m) : x;
    x = (x + b) % m;
  }
  return r;
}
