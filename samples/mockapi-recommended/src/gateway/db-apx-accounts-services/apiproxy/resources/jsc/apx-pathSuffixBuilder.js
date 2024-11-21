var PathSuffixBuilder = function (context) {
	this.getContext = function () {
		return context || window.context;
	};
};

PathSuffixBuilder.prototype.getContextVariable = function (varName) {
	return this.getContext().getVariable(varName);
};

PathSuffixBuilder.prototype.setContextVariable = function (varName, value) {
	return this.getContext().setVariable(varName, value);
};

PathSuffixBuilder.prototype.setPathSuffix = function () {
	var flowName = context.getVariable("current.flow.name");
	var path = this.getContextVariable("request.path");
	var replacePathFrom = this.getContextVariable('replacePathFrom');
	var replacePathTo = this.getContextVariable('replacePathTo');
	var pathSuffix ;
	if(replacePathFrom) {
	     pathSuffix = path.replace(replacePathFrom, replacePathTo);
	} else {
	     pathSuffix = path.replace('/digitalbanking/db-', '/apx-');
	}
	this.setContextVariable('pathSuffix', pathSuffix);
	this.setContextVariable('apiName', flowName);
};

var builder = new PathSuffixBuilder(context);
builder.setPathSuffix();