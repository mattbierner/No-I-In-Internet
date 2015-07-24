var delimiter = "$$$";

/**
*/
module.exports = function(goodWords, input) {
    return input
        .replace(
            new RegExp('\\b(' + goodWords.sort().reverse().join('|') + ')\\b', 'gi'),
            function(goodWord) {
                return delimiter + goodWord + delimiter;
            })
        .split(delimiter)
        .map(function(x, i) {
            return i % 2 ? x : x.replace(/\w/g, '_');
        })
        .join('');
};