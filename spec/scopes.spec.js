/* global describe, it */

'use strict';

const
	AuthToken = require('@d2l/brightspace-auth-token'),
	expect = require('chai').expect;

const AssertionCompiler = require('../');

describe('scope assertions', function () {
	it('should match explicitly', function (done) {
		const assertion = new AssertionCompiler()
			.scope('valence', 'apps', 'manage').require()
			.compile();

		function makeAssertion () {
			const token = new AuthToken({
				scope: 'valence:apps:manage'
			}, 'x.y.z');

			assertion(token);
		}

		expect(makeAssertion).to.not.throw();
		done();
	});

	it('should respect wildcards', function (done) {
		const assertion = new AssertionCompiler()
			.scope('valence', 'apps', 'manage').require()
			.compile();

		function makeAssertion () {
			assertion(new AuthToken({
				scope: '*:*:*'
			}, 'x.y.z'));
			assertion(new AuthToken({
				scope: 'valence:*:*'
			}, 'x.y.z'));
			assertion(new AuthToken({
				scope: 'valence:apps:*'
			}, 'x.y.z'));
		}

		expect(makeAssertion).to.not.throw();
		done();
	});

	it('should throw when there is insufficient scope', function (done) {
		const assertion = new AssertionCompiler()
			.scope('valence', 'apps', 'manage').require()
			.compile();

		function makeAssertion () {
			const token = new AuthToken({
				scope: 'foo:bar:baz'
			}, 'x.y.z');

			assertion(token);
		}

		expect(makeAssertion).to.throw(/insufficient scope/i);
		done();
	});

	it('should throw when trying to reject scopes', function (done) {
		function buildAssertion () {
			new AssertionCompiler()
				.scope('foo', 'bar', 'baz').reject()
				.compile();
		}

		expect(buildAssertion).to.throw(/makes no sense/);
		done();
	});
});
