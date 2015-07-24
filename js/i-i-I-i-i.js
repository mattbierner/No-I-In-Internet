var contains = function(array, element) {
    return array.indexOf(element) >= 0;
};

/**
*/
module.exports = function(goodWords, input) {
    return input.replace(/(\w)+/g, function(word) {
        if (contains(goodWords, word))
            return word;
        else
            return word.replace(/./g, '_');
    });
};