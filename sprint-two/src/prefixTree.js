var keysT9 = {
  'a': 2,
  'b': 2,
  'c': 2,
  'd': 3,
  'e': 3,
  'f': 3,
  'g': 4,
  'h': 4,
  'i': 4,
  'j': 5,
  'k': 5,
  'l': 5,
  'm': 6,
  'n': 6,
  'o': 6,
  'p': 7,
  'q': 7,
  'r': 7,
  's': 7,
  't': 8,
  'u': 8,
  'v': 8,
  'w': 9,
  'x': 9,
  'y': 9,
  'z': 9
};

var keysAZ = {
  'a': 'a',
  'b': 'b',
  'c': 'c',
  'd': 'd',
  'e': 'e',
  'f': 'f',
  'g': 'g',
  'h': 'h',
  'i': 'i',
  'j': 'j',
  'k': 'k',
  'l': 'l',
  'm': 'm',
  'n': 'n',
  'o': 'o',
  'p': 'p',
  'q': 'q',
  'r': 'r',
  's': 's',
  't': 't',
  'u': 'u',
  'v': 'v',
  'w': 'w',
  'x': 'x',
  'y': 'y',
  'z': 'z'
};

var PrefixTree = function(t9) {
  this.t9 = (t9 === undefined) ? true : t9;
  this.keys = this.t9 ? keysT9 : keysAZ;

  this.children = {};
  this.words = [];
};

PrefixTree.prototype.insert = function(word, charIndex) {
  word = word.toLowerCase();
  charIndex = charIndex || 0;
  var key = this.keys[word.charAt(charIndex)];
  this.children[key] = this.children[key] || new PrefixTree(this.t9);
  //check if end of word
  if (word.length - 1 === charIndex) {
    //end of word - push if it's not already there
    if (this.children[key].words.indexOf(word) === -1) {
      this.children[key].words.push(word);
    }
  } else {
    this.children[key].insert(word, charIndex + 1);
  }
};

PrefixTree.prototype.getSuggestions = function(keyString, suggestionDepth) {
  //navigate to tree node at the end of key string
  //from there recursively traverse all nodes taking into account suggestionDepth
  //adding all words to the results array

  suggestionDepth = (typeof suggestionDepth === undefined) ? 3 : suggestionDepth;

  var results = [];
  var key = keyString.charAt(0);

  if (keyString.length === 1) {
    results = results.concat(this.children[key].words);
    _.each(this.children[key].children, function(child) {
      results = results.concat(child._traverse(suggestionDepth));
    });
  } else {
    results = results.concat(this.children[key].getSuggestions(keyString.slice(1), suggestionDepth));
  }

  return results;
};

PrefixTree.prototype._traverse = function(suggestionDepth) {
  var results = [];

  results = results.concat(this.words);

  if (suggestionDepth > 1) {
    _.each(this.children, function(child) {
      results = results.concat(child._traverse(suggestionDepth - 1));
    });
  }
  return results;
}
