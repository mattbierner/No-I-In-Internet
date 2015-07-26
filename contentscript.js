var didExecute = false;

/**
    Combine the whitelist of words into a regular expression. 
*/
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
    didExecute = true;
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

var rewrite = function () {
    chrome.runtime.sendMessage({method: "getOptions"}, function(options) {
        $(function() {
            rewritePage(options.elements, options.whitelist);
        });
    });
};

/**
    Toggle rewrites on or off. 
    
    Does not persist anything. Can override excluded sites.
*/
var toggle = function() {
    if (didExecute) {
        $('body').toggleClass('iiiii-override');
    } else {
        rewrite();
    }
};

/**
    List for events from popup
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.method) {
    case 'toggle':
        toggle();
        sendResponse({});
        break;
    
    case 'disable':
        $('body').addClass('iiiii-override');
        sendResponse({});
        break;
    
    default:
        sendResponse({});
        break;
    }
});

/**
*/
var isExcluded = function(options, location) {
    var url = normalizeUrl(location.hostname + location.pathname);
    return options.excludedSites.some(function(site) {
        if (site === url)
            return true;
        if (site.substr(-2) === '/*')
            return url.indexOf(site.substr(0, site.length - 1)) === 0 ||
                url === normalizeUrl(site.substr(0, site.length - 1));
        if (site.substr(-1) === '*')
            return url.indexOf(site.substr(0, site.length - 1)) === 0;
        return false;
    });
};

var tryRewrite = function(options) {
    if (!isExcluded(options, window.location)) {
        rewrite(options);
    }
};

chrome.runtime.sendMessage({method: "getOptions"}, tryRewrite);


