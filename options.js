var restoreOptions = function() {
    chrome.storage.sync.get({
        whitelist: 'red',
        likesColor: true
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);


