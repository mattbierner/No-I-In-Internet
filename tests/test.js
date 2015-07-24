var iiIii = require('../js/i-i-i-i-i');


exports.empty_returns_empty = function(test) {
    test.equal("", iiIii([], ""));
    test.done();
};

exports.space_returns_space = function(test) {
    test.equal(" ", iiIii([], " "));
    test.equal("\n", iiIii([], "\n"));
    test.done();
};

exports.non_special_character_replaced = function(test) {
    test.equal("_", iiIii([], "a"));
    test.equal("_", iiIii([], "5"));
    test.done();
};

exports.replace_multiple_characters = function(test) {
    test.equal("___", iiIii([], "abc"));
    test.done();
};

exports.replace_multiple_characters_with_spaces = function(test) {
    test.equal("_   __\n__", iiIii([], "a   bc\nde"));
    test.done();
};
