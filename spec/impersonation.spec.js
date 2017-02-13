/* global describe, it */

'use strict';

const
	AuthToken = require('brightspace-auth-token'),
	expect = require('chai').expect;

const AssertionCompiler = require('../');

describe('impersonation assertions', function () {
	describe('require', function () {
		it('should pass when user an actualUser differ', function (done) {
			const assertion = new AssertionCompiler()
				.impersonation().require()
				.compile();

			function makeAssertion () {
				const token = new AuthToken({
					sub: '123',
					actualsub: '456',
					tenantid: 'foozleberries'
				}, 'x.y.z');

				assertion(token);
			}

			expect(makeAssertion).to.not.throw();
			done();
		});

		it('should throw when user and actualUser are the same', function (done) {
			const assertion = new AssertionCompiler()
				.impersonation().require()
				.compile();

			function makeAssertion () {
				const token = new AuthToken({
					sub: '123',
					tenantid: 'foozleberries'
				}, 'x.y.z');

				assertion(token);
			}

			expect(makeAssertion).to.throw(/impersonation is required/i);
			done();
		});

		it('should throw when there is no user', function (done) {
			const assertion = new AssertionCompiler()
				.impersonation().require()
				.compile();

			function makeAssertion () {
				const token = new AuthToken({ tenant: 'foozleberries' }, 'x.y.z');

				assertion(token);
			}

			expect(makeAssertion).to.throw(/invalid context/i);
			done();
		});

		it('should throw when there is no tenant', function (done) {
			const assertion = new AssertionCompiler()
				.impersonation().require()
				.compile();

			function makeAssertion () {
				const token = new AuthToken({}, 'x.y.z');

				assertion(token);
			}

			expect(makeAssertion).to.throw(/invalid context/i);
			done();
		});
	});

	describe('reject', function () {
		it('should throw when user an actualUser differ', function (done) {
			const assertion = new AssertionCompiler()
				.impersonation().reject()
				.compile();

			function makeAssertion () {
				const token = new AuthToken({
					sub: '123',
					actualsub: '456',
					tenantid: 'foozleberries'
				}, 'x.y.z');

				assertion(token);
			}

			expect(makeAssertion).to.throw(/impersonation is not allowed.+123.+456/i);
			done();
		});

		it('should pass when user and actualUser are the same', function (done) {
			const assertion = new AssertionCompiler()
				.impersonation().reject()
				.compile();

			function makeAssertion () {
				const token = new AuthToken({
					sub: '123',
					tenantid: 'foozleberries'
				}, 'x.y.z');

				assertion(token);
			}

			expect(makeAssertion).to.not.throw();
			done();
		});

		it('should pass when there is no user', function (done) {
			const assertion = new AssertionCompiler()
				.impersonation().reject()
				.compile();

			function makeAssertion () {
				const token = new AuthToken({ tenant: 'foozleberries' }, 'x.y.z');

				assertion(token);
			}

			expect(makeAssertion).to.not.throw();
			done();
		});

		it('should pass when there is no tenant', function (done) {
			const assertion = new AssertionCompiler()
				.impersonation().reject()
				.compile();

			function makeAssertion () {
				const token = new AuthToken({}, 'x.y.z');

				assertion(token);
			}

			expect(makeAssertion).to.not.throw();
			done();
		});
	});
});
