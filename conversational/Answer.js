let isArray = require('lodash/isArray');
let some = require('lodash/some');

class Answer {
	constructor(name, targetState, regex, callback) {
		this.name = name;
		this.targetState = targetState;
		this.regex = regex;
		this.callback = callback;
		this.displayHint = true;
	}

	testSingle(input, regex) {
		if (regex instanceof RegExp) {
			return regex.test(input);
		} else {
			return regex === input;
		}
	}

	test(input) {
		if (isArray(this.regex)) {
			return some(this.regex, regex => {
				return this.testSingle(input, regex);
			});
		} else {
			return this.testSingle(input, this.regex);
		}
	}
}

module.exports = Answer;
