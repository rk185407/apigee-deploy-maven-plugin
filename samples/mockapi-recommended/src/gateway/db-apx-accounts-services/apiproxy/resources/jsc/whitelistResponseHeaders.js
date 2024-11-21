    try {
    var utils = new Utils(context),
        responseHeaderBuilder = new ResponseHeaderBuilder(utils);
        responseHeaderBuilder.buildHeaders();
} catch (err) {
        utils.setContextVariable('flow.error.code', Errors.INTERNAL_SERVER_ERROR.code);
        utils.setContextVariable('flow.error.message', Errors.INTERNAL_SERVER_ERROR.message);
        utils.setContextVariable('flow.error.status', 500);
        utils.setContextVariable('jserror', err);
        throw err;
 }