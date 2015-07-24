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
