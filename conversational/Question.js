let Answer = require('./Answer');
let isArray = require('lodash/isArray');
let isString = require('lodash/isString');
let isFunction = require('lodash/isFunction');
let every = require('lodash/every');
let some = require('lodash/some');
let filter = require('lodash/filter');
let map = require('lodash/map');
let find = require('lodash/find');

class Question {
	constructor(questionText, settings) {
		this.questionText = questionText;
		this.answers = settings.answers;
		this.onEnter = isFunction(settings.onEnter) ? settings.onEnter : null;
		this.onLeave = isFunction(settings.onLeave) ? settings.onLeave : null;
		this.settings = settings;
	}

	get answers() {
		return this._answers;
	}

	set answers(answers) {
		if (isArray(answers) && every(answers, answer => answer instanceof Answer)) {
			this._answers = answers;
		} else {
			// console.log('Invalid value for answers', answers, this.questionText);
			this._answers = [];
			// throw new Error('Invalid value for answers');
		}
	}

	getQuestionText() {
		if (isString(this.questionText)) {
			return this.questionText;
		} else if (isFunction(this.questionText)) {
			return this.questionText();
		}
		return '';
	}

	getPossibleAnswerNames() {
		let filtered = this.getPossibleAnswers();
		return map(filtered, answer => {
			return answer.name;
		});
	}

	getPossibleAnswers() {
		let filtered = filter(this.answers, answer => {
			return answer.displayHint !== false;
		});
		return filtered;
	}

	setAnswer(fsm, answerText) {
		let matchingAnswer = this.findMatchingAnswer(answerText);
		if (matchingAnswer) {
			return this.executeAnswer(fsm, matchingAnswer, answerText);
		} else {
			return false;
		}
	}

	findMatchingAnswer(answerText) {
		return find(this.answers, (answer) => {
			return answer.test(answerText);
		});
	}

	executeAnswer(fsm, answer, answerText) {
		//call the callback
		if (answer.callback) {
			//TODO: async? auf antwort warten?
			answer.callback(answerText);
		}
		if (fsm && answer.targetState) {
			fsm.transition(answer.targetState);
		}

		fsm.emit('answered', this, answer, answerText);
		return true;
	}

	hasTransition(targetState) {
		return some(this.answers, answer => {
			return answer.targetState == targetState;
		});
	}
}

module.exports = Question;
