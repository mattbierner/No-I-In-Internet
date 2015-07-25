var DEFAULT_OPTIONS = {
    'whitelist': [
        'i', 'me', 'myself', 'my', 'mine',
        "i\\'m", "i\\'ll", "i\\'ve",
        'we', 'us', 'ours', 'ourself', 'ourselves', 'us',
        'twitter', 'tweet', 'tweets', 'facebook',
        'instagram', 'instagrams', 'selfie'],
        
    'elements': 'p, h1, h2, h3, h4, h5, h6' 
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
else
    window.DEFAULT_OPTIONS = DEFAULT_OPTIONS;