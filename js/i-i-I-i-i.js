var toLowerCase = Function.prototype.call.bind(String.prototype.toLowerCase);

var contains = function(array, element) {
    return array.indexOf(element) >= 0;
};

/**
*/
module.exports = function(goodWords, input) {
    var z = goodWords.length ?
        new RegExp('\\b((?!(' + goodWords.join('|') + ')\\b)\\w+)', "gi") :
        /\w+/g;
    console.log(z);
    return input.replace(z, function(word) {
        if (contains(goodWords, toLowerCase(word)))
            return word;
        else
            return word.replace(/./g, '_');
    });
};