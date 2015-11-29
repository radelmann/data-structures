$(document).ready(function() {
  var ptT9 = new PrefixTree();
  var ptChar = new PrefixTree(false);

  //add words to tree
  var words = dictionary.split(' ');
  words.forEach(function(word) {
    ptT9.insert(word);
    ptChar.insert(word);
  });

  $('.t9-message').on('keyup', function() {
    getT9Suggestions();
  });

  $('.char-message').on('keyup', function() {
    getCharSuggestions();
  });


  $('.t9').on('click', 'button', function() {
    var number = ($(this).find('h1').text());
    var current = $('.t9-message').val();
    $('.t9-message').val(current += number).keyup();
  });

  $('.delete').on('click', function() {
    var current = $('.t9-message').val();
    $('.t9-message').val(current.slice(0, -1)).keyup();
  });

  var getT9Suggestions = function() {
    var string = $('.t9-message').val();
    $('.suggestions').empty();

    var suggestions = ptT9.getSuggestions(string, 1);
    suggestions = suggestions.sort();

    _.each(suggestions, function(suggestion, i) {
      var elem = $('<p>');
      elem.text(suggestion);
      $('.suggestions').append(elem);
    });
  };

  var getCharSuggestions = function() {
    var string = $('.char-message').val();
    $('.suggestions').empty();

    var suggestions = ptChar.getSuggestions(string, 3);
    suggestions = suggestions.sort();

    _.each(suggestions, function(suggestion, i) {
      var elem = $('<p>');
      elem.text(suggestion);
      $('.suggestions').append(elem);
    });
  };
});
