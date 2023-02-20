## This repository has been archived on 20.02.2023
The reason for the retirement is that the code is not used anymore.

# Conversational Machine

* A state machine for conversational interfaces
* is a npm module https://www.npmjs.com/package/@aeternity/conversational-machine
* is basically a simple finite state machine (FSM) for Question-Answer scenarios like conversations
	* Questions are states
	* Answers define transitions

## installation

```
npm install --save @aeternity/conversational-machine
```

## example usage
* In the [æternity notary project](https://github.com/aeternity/aepp-aexistence/blob/master/src/machine.js)

## usage

```javascript
import { ConversationalFSM, Question, AnswerFactory } from '@aeternity/conversational-machine'

let fsm = new ConversationalFSM({
	initialState: 'welcome',
	states: {
		welcome: new Question('Hello how are you?', {
			answers: [
				AnswerFactory.answer('Good', 'feelGood', /^good/i, function() {
					console.log('the user chose good');
				}),
				AnswerFactory.answer('Bad', 'feelBad', /^bad/i),
			]
		}),
		feelGood: new Question('That\'s nice', {
			onEnter: function() {
				console.log('We entered feelGood state');
				fsm.emit('userFeelsGood');
			},
			onLeave: function() {
				console.log('We left feelGood state');
			},
			answers: [...]
		}),
		feelBad: new Question('Im sorry to hear that', {
			answers: [
				AnswerFactory.answer('Ask again', 'welcome', /^ask/i),
			]
		}),
		...
	}
});

fsm.on('userFeelsGood', () => {
	console.log('we got the userFeelsGood event');
});

```
This Code has 3 States "welcome", "feelGood", "feelBad" and transitions from welcome -> feelGood and welcome -> feelBad and feelBad -> welcome

* a question has
	* the question text that can be displayed to the user
	* a list of answers (there are multiple answer types)
	* an onEnter handler
	* an onLeave handler

* an answer has
	* a hint text for example to display predefined possible answers
	* a target state in which to transition when the answer is chosen
	* a regex to match which answer is chosen
	* an optional callback

* the state machine is an EventEmitter and emits some events by default
	* invalidState
		* when you try to execute an invalid transition
		* data: fromState, toState
	* transition
		* when the machine changes from one state to another
		* data: fromState, toState
	* onLeave_<state>
		* when machine leaves state <state>
		* data: fromState, toState
	* onEnter_<state>
		* when machine enters state <state>
		* data: fromState, toState
* you can emit custom events to communicate with code outside the machine like `fsm.emit('userFeelsGood');`

## extensibility

You can extend the default Classes like
```javascript
class MyQuestion extends Question {
	constructor (questionText, myText, settings) {
		super(questionText, settings)
		this.myText = myText
	}

	let fsm = new ConversationalFSM({
		// ...
		states: {
			// ...
			myQuestion: new MyQuestion('How are you?', 'myExtraText', {
				onEnter: function () {
					console.log(this.myText)
				}
			}),
			// ...
		}
	});
}
```

## API
### FSM
* fsm.getCurrentQuestion() get the current states question
* fsm.setAnswer(answerText) sets a string as an answer. all possible answers are checked for matches and if a regex matches the transition is executed
* fsm.transition(newState) transitions the fsm to the new state manually, this is only possible if an answer exists where the new state is the target state

### Question
* question.getQuestionText() gets the text of the question
* question.getPossibleAnswerNames() gets all the names (strings) of the possible answers to this question
* question.getPossibleAnswers() gets all the possible Answer Objects to this question

## example flow
A typical loop would be:
* Get the current question
* Ask the user the questionText
* Display all the possible answers to the user
* await user input
* pass user input into setAnswer
* the machine changes its state internally
* start from the top
