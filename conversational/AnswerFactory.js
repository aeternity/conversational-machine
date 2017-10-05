let Answer = require('./Answer');
let AnswerFreetext = require('./AnswerFreetext');
let AnswerSettings = require('./AnswerSettings');
let AnswerHidden = require('./AnswerHidden');

class AnswerFactory {
	constructor() {
	}

	static answer(name, transition, regex, callback) {
		return new Answer(name, transition, regex, callback);
	}

	static freetext(name, transition, regex, callback) {
		return new AnswerFreetext(name, transition, regex, callback);
	}

	static settings(name, transition, regex, settings, callback) {
		return new AnswerSettings(name, transition, regex, settings, callback);
	}

	static hidden(transition, settings, callback) {
		return new AnswerHidden(transition, settings, callback);
	}
}

module.exports = AnswerFactory;
