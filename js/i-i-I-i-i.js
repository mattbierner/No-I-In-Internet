var toLowerCase = Function.prototype.call.bind(String.prototype.toLowerCase);

var contains = function(array, element) {
    return array.indexOf(element) >= 0;
};

/**
*/
module.exports = function(goodWords, input) {
    goodWords = goodWords.map(toLowerCase);
    return input.replace(/(\w)+/g, function(word) {
        if (contains(goodWords, toLowerCase(word)))
            return word;
        else
            return word.replace(/./g, '_');
    });
};