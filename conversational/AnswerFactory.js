let Answer = require('./Answer');
// let AnswerYes = require('./AnswerYes');
let AnswerFreetext = require('./AnswerFreetext');

class AnswerFactory {
	constructor() {
	}

	static answer(name, transition, regex, callback) {
		return new Answer(name, transition, regex, callback);
	}

	static freetext(name, transition, regex, callback) {
		return new AnswerFreetext(name, transition, regex, callback);
	}

	// static yes(callback) {
	// 	return new AnswerYes(callback);
	// }
}

module.exports = AnswerFactory;
