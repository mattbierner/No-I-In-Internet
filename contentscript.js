var createWhitelistRegexp = function(whitelist) {
    return new RegExp(
        '\\b(' + whitelist.sort().reverse().join('|') + ')\\b',
        'gi');
};

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


var rewritePage = function(targets, whitelist) {
    var whitelistRegexp = createWhitelistRegexp(whitelist);
    $(targets).each(function() {
        var total = 0;
        var reserved = 0;
        forEachTextNode($(this), function(node) {
            node.replaceWith(
                node.text().split(whitelistRegexp).map(function(word) {
                    if (word.match(whitelistRegexp)) {
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
};


chrome.runtime.sendMessage({method: "getOptions"}, function(options) {
    $(function() {
        rewritePage(options.elements, options.whitelist);
    });
});

