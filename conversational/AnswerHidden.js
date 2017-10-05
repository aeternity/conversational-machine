let AnswerSettings = require('./AnswerSettings');

class AnswerHidden extends AnswerSettings {
	constructor(transition, settings, callback) {
		super(null, transition, null, settings, callback);
		this.displayHint = false;
	}
}

module.exports = AnswerHidden;
