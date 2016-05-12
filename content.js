//Many thanks to Github user mjp2220 for the wonderful Usless Chrome Extension tutorial where most of this originated. https://github.com/mjp2220/useless-chrome-extensions

var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
var MATCH = ["the devil's advocate","I'm not racist but", "devil's advocate", "I'm not racist, but"];
var REPLACE = ["the asshole","I'm an asshole, so", "Asshole", "I'm an asshole, so"];

walk(document.body);

function walk(node) {
    // Function from here for replacing text: http://is.gd/mwZp7E

    var child, next;

    switch (node.nodeType) {
        case ELEMENT:  // Element
        case DOCUMENT:  // Document
        case DOCUMENT_FRAGMENT: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case TEXT: // Text node
            replaceText(node);
            break;
    }
}

function replaceText(textNode) {
    var v = textNode.nodeValue;

    // Go through and match/replace all the strings we've given it, using RegExp.
    for (var i = 0; i < MATCH.length; i++) {
        v = v.replace(new RegExp('\\b' + MATCH[i] + '\\b', 'gi'), REPLACE[i]);
    }

    textNode.nodeValue = v;
}