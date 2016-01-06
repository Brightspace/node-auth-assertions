# brightspace-auth-assertions
[![Build Status](https://travis-ci.org/Brightspace/node-auth-assertions.svg?branch=master)](https://travis-ci.org/Brightspace/node-auth-assertions.svg?branch=master)

## Example

```js
const
	AssertionCompiler = require('brightspace-auth-assertions'),
	AuthToken = require('brightspace-auth-token');

const asserter = new AssertionCompiler()
	.scope('valance', 'apps', 'manage').require()
	.context(AssertionCompiler.contexts.Tenant).require()
	.compile();

// ...

server.on('request', function (req) {
	const auth = getAuthInfo();

	const token = new AuthToken(auth);

	asserter(token);
});
```

## Testing

```bash
npm test
```

## Contributing

1. **Fork** the repository. Committing directly against this repository is
   highly discouraged.

2. Make your modifications in a branch, updating and writing new unit tests
   as necessary in the `spec` directory.

3. Ensure that all tests pass with `npm test`

4. `rebase` your changes against master. *Do not merge*.

5. Submit a pull request to this repository. Wait for tests to run and someone
   to chime in.

### Code Style

This repository is configured with [EditorConfig][EditorConfig], [jscs][jscs]
and [JSHint][JSHint] rules. See the [docs.dev code style article][code style]
for information on installing editor extensions.

[EditorConfig]: http://editorconfig.org/
[jscs]: http://jscs.info/
[JSHint]: http://jshint.com/
[code style]: http://docs.dev.d2l/index.php/JavaScript_Code_Style_(Personal_Learning)
