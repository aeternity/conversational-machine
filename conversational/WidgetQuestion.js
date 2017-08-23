let Question = require('./Question');
class WidgetQuestion extends Question {
	constructor(questionText, widget, settings ) {
		super(questionText, settings)
		this.widget = widget;
	}
	get widget() {
		return this._widget;
	}
	set widget(widget) {
		this._widget = widget;
	}
}
module.exports = WidgetQuestion;
