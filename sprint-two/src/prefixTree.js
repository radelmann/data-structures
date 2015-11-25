// The PrefixTree that can handle autocomplete for T9-style texting
var keys = {
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

var PrefixTree = function() {
  this.children = {};
  this.words = [];
};

// Traverse the tree to the node where the word should be inserted. If any
// needed nodes do not exist along the way, they are created.
PrefixTree.prototype.insert = function(word, charIndex) {
  word = word.toLowerCase();
  charIndex = charIndex || 0;
  var key = keys[word.charAt(charIndex)];
  this.children[key] = this.children[key] || new PrefixTree();
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

// Traverse the tree based on the key digits in keyString, to find the node
// where relevant words are stored.
PrefixTree.prototype.getSuggestions = function(keyString, suggestionDepth, charIndex) {
  //navigate to tree node at the end of key string
  //from there recursively traverse all nodes taking into account suggestionDepth
  //adding all words to the results array
  
  suggestionDepth = suggestionDepth || 10; //default
  var results = [];
  charIndex = charIndex || 0;
  var key = keyString.charAt(charIndex);

  if (charIndex >= keyString.length - 1) {
    if (charIndex < keyString.length + suggestionDepth)
      for (var child in this.children) {
        results = results.concat(this.children[child].words);
        results = results.concat(this.children[child].getSuggestions(keyString, suggestionDepth, charIndex + 1));
      }
  } else {
    results = results.concat(this.children[key].getSuggestions(keyString, suggestionDepth, charIndex + 1));
  }

  return results;
};
