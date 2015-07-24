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
    test.equal("  _   __\n__ ", iiIii([], "  a   bc\nde "));
    test.done();
};

exports.does_not_replace_special_character = function(test) {
    test.equal("i", iiIii(['i'], "i"));
    test.done();
};

exports.does_not_replace_special_character_case_insensitive = function(test) {
    test.equal("i I i I I i", iiIii(['i'], "i I i I I i"));
    test.equal("i I i I I i", iiIii(['I'], "i I i I I i"));
    test.done();
};

exports.does_not_replace_special_character_ignore_puctuator = function(test) {
    test.equal("i.I,i-I!I?i'i'\"i\"", iiIii(['i'], "i.I,i-I!I?i'i'\"i\""));
    test.done();
};

exports.does_not_replace_any_special_character = function(test) {
    test.equal("_ b c _", iiIii(['b', 'c'], "a b c d"));
    test.done();
};

exports.special_word = function(test) {
    test.equal("my", iiIii(['my'], "my"));
    test.equal("___", iiIii(['my'], "mmy"));
    test.equal("___", iiIii(['my'], "myy"));
    test.equal("my ___ my", iiIii(['my'], "my xmy my"));
    test.done();
};

exports.special_word_with_spaces = function(test) {
    test.equal("i self", iiIii(['i self'], "i self"));
    test.equal("__ i self __", iiIii(['i self'], "my i self my"));
    test.equal("_ _____", iiIii(['i self'], "i xself"));
    test.equal("_ _____", iiIii(['i self'], "i selfx"));
    test.done();
};

exports.special_word_with_spaces_matches_longest = function(test) {
    test.equal("a b c", iiIii(['a b', 'a b c'], "a b c"));
    test.done();
};
