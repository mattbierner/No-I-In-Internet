
/**
*/
module.exports = function(goodWords, input) {
    return input.replace(/\w/g, '_');
};