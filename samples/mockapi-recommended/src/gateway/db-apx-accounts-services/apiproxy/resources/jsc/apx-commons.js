/** Common to all proxies **/
var Utils = function (utilsContext) {
    this.getContext = function () {
        return utilsContext || window.context;
    };

};

Utils.prototype.normalizeInstitutionId = function (institutionId) {
    institutionId = institutionId || '';
    var padded = institutionId.length >= Constants.INSTITUTION_ID_LENGTH ? institutionId : this.pad(institutionId, Constants.INSTITUTION_ID_LENGTH);
    return padded.substring(padded.length - (Constants.INSTITUTION_ID_LENGTH - 1));
};

Utils.prototype.convertInstitutionIdToNumeric = function (institutionId) {
    return "0" + this.normalizeInstitutionId(institutionId);
};

 
Utils.prototype.createValidationErrorResponse = function (error, httpStatus) {
    return {
        status: httpStatus || 400,
        message: error.message,
        code: error.code || 'CMN_90002'
    };
};


Utils.prototype.createSystemError = function (errorMessage, httpStatus, errorCode) {
    return {
        status: httpStatus,
        message: errorMessage,
        code: errorCode || 'CMN_90003'
    };
};

Utils.prototype.hasValue = function (val) {
    if (!val || val.trim === Constants.EMPTY_STRING) {
        return false;
    }
    return true;
};

Utils.prototype.getHeader = function (headerName, isMultiValue) {
    var term = isMultiValue ? Constants.REQUEST_HEADER_PREFIX + headerName + '.values' : Constants.REQUEST_HEADER_PREFIX + headerName;
    return this.getContext().getVariable(term);
};

Utils.prototype.getSanitizedHeader = function (headerName, isMultiValue) {
    var term = isMultiValue ? Constants.REQUEST_HEADER_PREFIX + headerName + '.values' : Constants.REQUEST_HEADER_PREFIX + headerName;
    return this.sanitizeLogEntry(this.getContextVariable(term));
};

Utils.prototype.setHeader = function (headerName, headerValue) {
    return this.getContext().setVariable(Constants.REQUEST_HEADER_PREFIX + headerName, headerValue);
};

Utils.prototype.removeResponseHeader = function (headerName) {
    return this.getContext().removeVariable(Constants.RESPONSE_HEADER_PREFIX + headerName);
};

Utils.prototype.removeRequestHeader = function (headerName) {
    return this.getContext().removeVariable(Constants.REQUEST_HEADER_PREFIX + headerName);
};

Utils.prototype.getFormParam = function (formParamName) {
    return this.getContext().getVariable(Constants.REQUEST_FORM_PARAM_PREFIX + formParamName);
};

Utils.prototype.getQueryParam = function (queryParamName) {
    return this.getContext().getVariable(Constants.REQUEST_QUERY_PARAM_PREFIX + queryParamName);
};

Utils.prototype.getContextVariable = function (varName) {
    return this.getContext().getVariable(varName);
};

Utils.prototype.setContextVariable = function (varName, value) {
    return this.getContext().setVariable(varName, value);
};

Utils.prototype.getHeaderOrThrow = function (headerName, isMultiValue) {
    var header = this.getHeader(headerName, isMultiValue);
    if (!this.hasValue(header)) {
        throw new Error(headerName + ' not found in headers');
    }
    return header;
};

Utils.prototype.getContextVariableOrThrow = function (varName) {
    var contextVar = this.getContextVariable(varName);
    if (!this.hasValue(contextVar)) {
        throw new Error(varName + ' not found in context');
    }
    return contextVar;
};

Utils.prototype.equalIgnoringCase = function (value, other) {
    return (""+value).toLowerCase() === (""+other).toLowerCase();
};
 
Utils.prototype.isAReservedIpAddress = function (ipAddress) {
    return Constants.REGEX_RESERVED_IP_ADDRESS.filter(function (pattern) {
        return pattern.test(ipAddress);
    }).length > 0;
};

Utils.prototype.isAProxyServerIp = function (ipAddress) {
    return Constants.PROXY_SERVER_IPS.indexOf(ipAddress) !== -1;
};

Utils.prototype.isAValidIp = function (ipAddress) {
    return Constants.REGEX_VALID_IP_ADDRESS.test(ipAddress);
};

Utils.prototype.containsListCharacters = function (stringifiedHeader) {
    return stringifiedHeader.indexOf('[') === 0 && stringifiedHeader.indexOf(']') === stringifiedHeader.length - 1;
};

Utils.prototype.splitMultiValuedHeader = function (header) {
    if (header === null) {
        return [];
    }
    var stringifiedHeader = header + '';
    if (this.containsListCharacters(stringifiedHeader)) {
        return stringifiedHeader
            .substring(1, stringifiedHeader.length - 1)
            .split(',')
            .map(function (ip) {
                return ip.trim();
            });
    }
    return [stringifiedHeader];
};

Utils.prototype.getValidIps = function (ipHeader) {
    var that = this;
    return this.splitMultiValuedHeader(ipHeader)
        .filter(function (ipToCheck) {
            return that.isAValidIp(ipToCheck) && !that.isAProxyServerIp(ipToCheck) && !that.isAReservedIpAddress(ipToCheck);
        });
};

Utils.prototype.setIpAddress = function (apigeeResolvedIp) {
    this.setHeader(Constants.HEADER_ORIGINATING_IP, apigeeResolvedIp);
};

Utils.prototype.pad = function (n, width) {
    var str;
    if (n) {
        str = n.toString();
    } else {
        str = Constants.EMPTY_STRING;
    }
    width = width || Constants.INSTITUTION_ID_PAD_LENGTH;
    return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
};

Utils.prototype.formatDate = function (params) {
    return Constants.DATE_FORMAT.replace('{year}', params.year)
        .replace('{month}', this.pad(params.month))
        .replace('{day}', this.pad(params.day))
        .replace('{hour}', this.pad(params.hour))
        .replace('{minute}', this.pad(params.minute))
        .replace('{second}', this.pad(params.second))
        .replace('{milliSecond}', params.milliSecond);
};

Utils.prototype.truncate = function (str, length, truncateStr) {
    str = str || "";
    truncateStr = truncateStr || "...";
    return str.length > length ? str.slice(0, length) + truncateStr : str;
};

Utils.prototype.normalizeFiid = function (fiId) {
    fiId = fiId || '';
    var padded = fiId.length >= Constants.FIID_LENGTH ? fiId : this.pad(fiId, Constants.FIID_LENGTH);
    return padded.substring(padded.length - (Constants.FIID_LENGTH - 1));
};

Utils.prototype.fiidToNumericFormat = function (fiId) {
    return "0" + this.normalizeFiid(fiId);
};

Utils.prototype.toArray = function (collection) {
    var result = [];
    if (collection) {
        collection.toArray().forEach(function (element) {
            result.push(element.toString());
        });
    }
    return result;
};

Utils.prototype.sanitizeLogEntry = function (value) {
    return value ? value.replace(/\n/g, '[\\n]').replace(/\r/g, '[\\r]') : value;
};

Utils.prototype.createUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        /* jshint bitwise: false */
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        /* jshint bitwise: true */
        return v.toString(16);
    });
};

Utils.prototype.shouldUpdateUserLastActivity = function () {
    return this.getContextVariable("app.skipUpdateUserLastActivity") !== "true";
};

Utils.prototype.shouldWriteApiUseEvent = function () {
    var auditApiUseVars = [
        "app.auditApiUse",
        "verifyapikey.VerifyApiKey.auditApiUse",
        "app.audit-api-use",
        "verifyapikey.VerifyApiKey.audit-api-use"
    ];
    for (var i = 0; i < auditApiUseVars.length; i++) {
        if (this.getContextVariable(auditApiUseVars[i]) === "true") {
            return true;
        }
    }
    return false;
};


Utils.prototype.getProductCode = function () {
    var prodCode = this.getContextVariable(Constants.PRODUCT_CODE);
    if (prodCode) {
        return prodCode;
    }
    prodCode = this.getContextVariable("verifyapikey.VerifyApiKey.bill-prod-code");
    return this.getValueOrDefault(prodCode);
};

Utils.prototype.getValueOrDefault = function (val) {
    return val || Constants.NA;
};

/* Mostly GL functions*/
Utils.prototype.getSanitizedContextVariable = function (varName) {
    return this.sanitizeLogEntry(this.getContextVariable(varName));
};

Utils.prototype.getIp = function() {
    var ipAddress = utils.getContextVariable(Constants.CLIENT_IP);
    return this.getValueOrDefault(ipAddress);
};

Utils.prototype.sanitizeLogEntry = function (value) {
    return value ? value.replace(/\n/g, '[\\n]').replace(/\r/g, '[\\r]') : value;
};

Utils.prototype.getResult = function () {
    var responseStatusCode = this.getContextVariable("response.status.code");
    if (responseStatusCode){
        return !Constants.REGEX_STATUS_CODE.test(responseStatusCode) ? "Failure" : "Success";
    } else {
        responseStatusCode = this.getContextVariable("message.status.code"); 
        if(responseStatusCode) {
            return !Constants.REGEX_STATUS_CODE.test(responseStatusCode) ? "Failure" : "Success";
        }
    }
    return responseStatusCode;
};

Utils.prototype.getAccessTokenAttribute = function(attribute) {
    return utils.getContextVariable(Constants.ACCESS_TOKEN_PREFIX + attribute);
};

Utils.prototype.getInstitutionId = function() {
    var institutionId = this.getHeader(Constants.INSTITUTION_ID);
    if(!institutionId){
        institutionId = this.getValueOrDefault(this.getAccessTokenAttribute(Constants.INSTITUTION_ID));
    }
    return this.sanitizeLogEntry(institutionId);
};

Utils.prototype.getUserGuid = function() {
    return this.getValueOrDefault(utils.getContextVariable('jwt.DecodeJWT.claim.legacyUserGuid'));
};

Utils.prototype.getUserType = function() {
    return this.getValueOrDefault(utils.getContextVariable('jwt.DecodeJWT.claim.institutionUserRole'));
};

Utils.prototype.getCustomerType = function() {
    return this.getValueOrDefault(utils.getContextVariable('jwt.DecodeJWT.claim.institutionUserType'));
};

Utils.prototype.getMemberNumber = function() {
    var memberNumber = utils.getSanitizedContextVariable(Constants.QUERY_PARAM_HOST_USER_ID);
    if(!memberNumber) {
        var customerType = utils.getContextVariable('jwt.DecodeJWT.claim.institutionUserType');
        if("RETAIL" === customerType){
            var institutionCustomersString = utils.getContextVariable('jwt.DecodeJWT.claim.institutionCustomers');
            if(institutionCustomersString) {
                var institutionCustomers = JSON.parse(institutionCustomersString);
                if(institutionCustomers.length === 1){
                    memberNumber = institutionCustomers[0].memberNumber;
                }
            }
        }
    }
    return memberNumber; 
};
