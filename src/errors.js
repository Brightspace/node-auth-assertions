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

function ImpersonationNotAllowedError (user, actualUser) {
	this.name = 'ImpersonationNotAllowedError';
	this.status = 403;
	this.message = `Impersonation is not allowed, but user (${user}) and actual user (${actualUser}) differ.`;

	Error.captureStackTrace(this, this.constructor);
}
inherits(ImpersonationNotAllowedError, Error);

function ImpersonationRequiredError () {
	this.name = 'ImpersonationRequiredError';
	this.status = 403;
	this.message = `Impersonation is required.`;

	Error.captureStackTrace(this, this.constructor);
}
inherits(ImpersonationRequiredError, Error);

module.exports = {
	InvalidContext: InvalidContextError,
	InsufficientScope: InsufficientScopeError,
	ImpersonationNotAllowed: ImpersonationNotAllowedError,
	ImpersonationRequired: ImpersonationRequiredError
};
