$(function(){


$('#toggle').click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {method: "toggle"},
            function() { });
    });
});

$('#options').click(function(){
    chrome.runtime.openOptionsPage();
});

});