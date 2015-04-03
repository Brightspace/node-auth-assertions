'use strict';

const inherits = require('util').inherits;

function InvalidContextError () {
	this.name = 'InvalidContextError';
	this.status = 403;
	this.message = 'Invalid Context';

	Error.captureStackTrace(this, this.constructor);
}
inherits(InvalidContextError, Error);

function InsufficientScopeError (group, resource, permission) {
	this.name = 'InsufficientScopeError';
	this.status = 403;
	this.message = `Insufficient scope. Want "${group}:${resource}:${permission}"`;

	Error.captureStackTrace(this, this.constructor);
}
inherits(InsufficientScopeError, Error);

module.exports = {
	InvalidContext: InvalidContextError,
	InsufficientScope: InsufficientScopeError
};
