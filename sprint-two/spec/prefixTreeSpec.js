describe('PrefixTree - T9', function() {
  var prefixTree;

  beforeEach(function() {
    prefixTree = new PrefixTree(true);
  });

  it('should have properties named "children", "words", and "keys"', function() {
    expect(prefixTree.hasOwnProperty("children")).to.equal(true);
    expect(prefixTree.hasOwnProperty("keys")).to.equal(true);
    expect(prefixTree.hasOwnProperty("words")).to.equal(true);
  });

  it('it should handle numerical to letter conversion of phone inputs (T9-style texting)', function() {
    expect(prefixTree.keys['a']).to.equal(2);
    expect(prefixTree.keys['z']).to.equal(9);
  });

  it('should have methods named "insert" and "getSuggestions"', function() {
    expect(prefixTree.insert).to.be.a("function");
    expect(prefixTree.getSuggestions).to.be.a("function");
  });


  it('it should add "hello" to the tree', function() {
    var returned = prefixTree.insert("hello");
    expect(prefixTree.getSuggestions("43556").indexOf("hello") >= 0).to.equal(true);
  });

  it('it should add multiple words to the tree', function() {
    prefixTree.insert("hello");
    prefixTree.insert("helloo");
    prefixTree.insert("hellooo");
    prefixTree.insert("helloooo");
    var suggestions = prefixTree.getSuggestions("4355", 3);
    expect(suggestions.indexOf("hello") >= 0).to.equal(true);
    expect(suggestions.indexOf("helloo") >= 0).to.equal(true);
    expect(suggestions.indexOf("hellooo") >= 0).to.equal(true);
    expect(suggestions.indexOf("helloooo") > 0).to.equal(false);
  });

  it('it should returns expected number of suggestions based on suggestionDepth param', function() {
    prefixTree.insert("hello");
    prefixTree.insert("helloo");
    prefixTree.insert("hellooo");
    prefixTree.insert("helloooo");
    prefixTree.insert("hellooooo");
    prefixTree.insert("helloooooo");
    var suggestions = prefixTree.getSuggestions("4355", 4);
    expect(suggestions.indexOf("hello") >= 0).to.equal(true);
    expect(suggestions.indexOf("helloo") >= 0).to.equal(true);
    expect(suggestions.indexOf("hellooo") >= 0).to.equal(true);
    expect(suggestions.indexOf("helloooo") >= 0).to.equal(true);
    expect(suggestions.indexOf("hellooooo") >= 0).to.equal(false);
  });


  it('it should suggest mutltple worlds', function() {
    prefixTree.insert("hello");
    prefixTree.insert("hellooo");
    prefixTree.insert("hellloo");
    var suggestions = prefixTree.getSuggestions("4355", 3);
    expect(suggestions.length).to.equal(3);
  });

  it('it should be case insensitive', function() {
    var returned = prefixTree.insert("hELlO");
    expect(prefixTree.getSuggestions("43556").indexOf("hello") >= 0).to.equal(true);
  });


  it('it should be able to suggest only worlds with max 2 characters longer', function() {
    prefixTree.insert("hello");
    prefixTree.insert("helloo");
    prefixTree.insert("hellooo");
    var suggestions = prefixTree.getSuggestions("4355", 2);
    expect(suggestions.length).to.equal(2);
  });

  it('it should be able to suggest only worlds with max 3 characters longer', function() {
    prefixTree.insert("hello");
    prefixTree.insert("helloo");
    prefixTree.insert("hellooo");
    var suggestions = prefixTree.getSuggestions("4355", 3);
    expect(suggestions.length).to.equal(3);
  });

  it('it should build a dictionary and search against it', function() {
    var words = dictionary.split(' ');
    words.forEach(function(word) {
      prefixTree.insert(word);
    })

    var suggestions = prefixTree.getSuggestions("43556", 4);
    expect(suggestions.length).to.equal(5);
  });
});

describe('PrefixTree - Char', function() {
  var prefixTree;

  beforeEach(function() {
    prefixTree = new PrefixTree(false);
  });

  it('should have properties named "children", "words", and "keys"', function() {
    expect(prefixTree.hasOwnProperty("children")).to.equal(true);
    expect(prefixTree.hasOwnProperty("keys")).to.equal(true);
    expect(prefixTree.hasOwnProperty("words")).to.equal(true);
  });

  it('it should handle numerical to letter conversion of phone inputs (T9-style texting)', function() {
    expect(prefixTree.keys['a']).to.equal('a');
    expect(prefixTree.keys['z']).to.equal('z');
  });

  it('should have methods named "insert" and "getSuggestions"', function() {
    expect(prefixTree.insert).to.be.a("function");
    expect(prefixTree.getSuggestions).to.be.a("function");
  });


  it('it should add "hello" to the tree', function() {
    var returned = prefixTree.insert("hello");
    var suggestions = prefixTree.getSuggestions("hello", 1);
    expect(suggestions.indexOf('hello') >= 0).to.equal(true);
  });
});
