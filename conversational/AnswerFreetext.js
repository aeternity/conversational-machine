let Answer = require('./Answer');

class AnswerFreetext extends Answer {
	constructor(name, transition, regex, callback) {
		super(name, transition, regex, callback);
		this.displayHint = false;
	}
}

module.exports = AnswerFreetext;
