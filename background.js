var narcWords = ['i', 'me', 'myself', 'my', 'twitter', 'facebook', 'instagram', 'pintrest'];

var narcRegExp = new RegExp(
    '\\b(' + narcWords.sort().reverse().join('|') + ')\\b',
    'gi');


var toPercent = function(x) {
    return Math.round(x * 100);
};

/**
    Recursively extract all text nodes from a dom element.
*/
var forEachTextNode = function(base, f) {
    return base.contents().map(function() {
        switch (this.nodeType) {
        case 1:     return forEachTextNode($(this), f);
        case 3:     return f($(this));
        }
    });
};

$(function() {
    $('p, h1, h2, h3, h4, h5, h6').each(function() {
        var total = 0;
        var reserved = 0;
        forEachTextNode($(this), function(node) {
            node.replaceWith(
                node.text().split(narcRegExp).map(function(word) {
                    if (word.match(narcRegExp)) {
                        ++reserved;
                        ++total;
                        return '<span class="iiiii-reserved-word">' + word + '</span>';
                    } else {
                        return word.replace(/\w+/g, function(word) {
                            ++total;
                            return '<span class="iiiii-word"><span class="iiiii-word-inner">' + word + '</span></span>';
                        });
                    }
                }))
        });
        $(this).attr('title', toPercent(reserved / total));
    });
});
