var flatten = Function.prototype.apply.bind(Array.prototype.concat, []);

$(function() {
    var getTextNodes = function(base) {
        return flatten(base.contents().map(function() {
            if (this.nodeType === 1)
                return getTextNodes($(this));
            if (this.nodeType === 3)
                return this;
            else
                return [] 
        })
        .get());
    };

    getTextNodes($('article')).forEach(function(textNode) {
        textNode.data = iiIii(['i'], textNode.data);
    })

});