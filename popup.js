/**
    Toggle the content script on or off.
*/
var toggleContentScript = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {method: "toggle"},
            function() { });
    });
};

/**
    Toggle the effect on or off.
*/
var toggle = function() {
    toggleContentScript();
};

/**
    Get a url object from a url string.
*/
var getUrl = function(fullUrl) {
    var a = document.createElement('a');
    a.href = fullUrl;
    return a;
};

/**
    
*/
var addExcludedSite = function(site) {
    var key = normalizeUrl(site);
    chrome.storage.sync.get({ 'excludedSites':  [] }, function(options) {
        if (options.excludedSites.indexOf(key) === -1) {
            chrome.storage.sync.set({
                'excludedSites':  options.excludedSites.concat(key) });
        }
    });
};

/**
    Disable script for entire server.
*/
var disableSite = function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var url = getUrl(tabs[0].url)
        addExcludedSite(url.hostname + '/*');
    });
};

/**
    Disable script for current page.
*/
var disablePage = function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var url = getUrl(tabs[0].url);
        addExcludedSite(url.hostname + url.pathname);
    });
};


$(function(){

$('#toggle').click(toggle);

$('#disable-page').click(disablePage);
$('#disable-site').click(disableSite)

$('#options').click(function(){
    chrome.runtime.openOptionsPage();
});

});