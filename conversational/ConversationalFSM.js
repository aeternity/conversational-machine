const EventEmitter = require('events');

class ConversationalFSM {
	constructor(settings) {
		this.initialState = settings.initialState ? settings.initialState : 'uninitialized';
		this.eventEmitter = new EventEmitter();
		this.currentState = this.initialState;
		this.states = settings.states ? settings.states : {};
		this.storedData = settings.storedData ? settings.storedData : {};

		this.transitionStack = [];
		this.transitionLocked = false;
	}

	getCurrentQuestion() {
		return this.states[this.currentState];
	}

	getPossibleAnswers() {
		return this.getCurrentQuestion().answers;
	}

	async setAnswer(answerText) {
		let question = this.getCurrentQuestion();
		return await question.setAnswer(this, answerText);
	}

	transition(newState) {
		this.transitionStack.push(newState);
		if (!this.transitionLocked) {
			this.transitionLocked = true;
			this.executeTransition(this.transitionStack.shift());
		}
	}

	executeTransition(newState) {
		let fromState = this.currentState;
		if (!this.states[newState] || !this.getCurrentQuestion().hasTransition(newState)) {
			this.emit('invalidState', {
				fromState: fromState,
				toState: newState
			});
			// return false;
		} else {
			if (this.states[fromState].onLeave) {
				this.states[fromState].onLeave();
			}

			this.currentState = newState;
			this.emit('transition', {
				fromState: fromState,
				toState: newState
			});

			if (this.states[newState].onEnter) {
				this.states[newState].onEnter();
			}
		}

		if (this.transitionStack.length > 0) {
			this.executeTransition(this.transitionStack.shift());
		} else {
			this.transitionLocked = false;
		}
	}

	setData(key, value) {
		this.storedData[key] = value;
		this.emit('dataChanged', key, value, this.storedData);
	}

	getData(key) {
		return this.storedData[key];
	}

	on(eventName, callback) {
		this.eventEmitter.on(eventName, callback);
	}

	emit(eventName, ...args) {
		this.eventEmitter.emit(eventName, ...args);
	};
}

module.exports = ConversationalFSM;
