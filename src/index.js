/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
exports.isValidXML = xmlString => {
    if (xmlString.length === 0) {
        return false;
    }

    let tags = xmlString.match(new RegExp('<[^>]+>', 'ig')) || [];
    let stack = [];
    let preTag = '';

    for (let i = tags.length - 1; i >= 0; i--) {
        let currTag = tags[i];

        if (currTag.indexOf('/') !== -1) {
            if (stack.length > 2) {
                return false;
            } else {
                preTag = currTag.endsWith('/>') && currTag.match(new RegExp('[a-zA-Z]', 'ig'))[0] || preTag;
                stack.push(currTag);
            }
        } else {
            if (stack.length) {
                let closeTag = stack.pop();
                closeTag = closeTag.endsWith('/>') && stack.pop() || closeTag;
                if (closeTag.substring(2) !== currTag.substring(1)) return false;

                let tagName = currTag.match(new RegExp('[a-zA-Z]', 'ig'))[0];
                if (preTag && preTag === tagName) return false;
                preTag = tagName;

            } else {
                return false;
            }
        }
    }

    return true;
};
