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


$(function(){

$('#toggle').click(toggle);

$('#options').click(function(){
    chrome.runtime.openOptionsPage();
});

});