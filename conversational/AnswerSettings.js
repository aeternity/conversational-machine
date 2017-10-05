let Answer = require('./Answer');

class AnswerSettings extends Answer {
	constructor(name, transition, regex, settings, callback) {
		super(name, transition, regex, callback);
		this.settings = settings ? settings : {};
	}
}

module.exports = AnswerSettings;
