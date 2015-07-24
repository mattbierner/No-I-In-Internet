var iiIii = require('../js/i-i-i-i-i');


exports.empty_returns_empty = function(test) {
    test.equal("", iiIii([], ""));
    test.done();
};
