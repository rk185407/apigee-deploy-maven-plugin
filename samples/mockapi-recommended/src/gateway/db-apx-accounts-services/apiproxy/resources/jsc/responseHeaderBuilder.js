var ResponseHeaderBuilder = function(utils) {
    this.getUtils = function() {
        return utils;
    };
};

ResponseHeaderBuilder.prototype.isAsciiNonPrintable = function(str) {
    str = str || '';
    return !Constants.REGEX_NON_ASCII.test(str);
};

ResponseHeaderBuilder.prototype.isAllowedHeader = function(allowedResponseHeaders, header) {
    var utils = this.getUtils();
    return allowedResponseHeaders.filter(function(allowedHeader) {
        return utils.equalIgnoringCase(allowedHeader, header);
    }).length > 0;
};

ResponseHeaderBuilder.prototype.buildHeaders = function() {
    var utils = this.getUtils(),
        headerNames = utils.getContextVariable(Constants.RESPONSE_HEADERS_NAMES);
    var allowedResponseHeaders = utils.getContextVariable(Constants.PARAM_ALLOWED_RESPONSE_HEADERS);
    if (allowedResponseHeaders) {
        allowedResponseHeaders = allowedResponseHeaders.split(",").map(function(item) {
            return item.trim();
        });
    } else {
        // Set default headers if allowed headers is not passed to the shared flow
        allowedResponseHeaders = Constants.ALLOWED_RESPONSE_HEADERS;
    }

    if (headerNames) {
        utils.toArray(headerNames).forEach(function(header) {
            if (!(this.isAllowedHeader(allowedResponseHeaders, header))) {
                utils.removeResponseHeader(header);
            }
        }, this);
    }
};