let Question = require('./Question');
class WidgetQuestion extends Question {
	constructor(questionText, widgets, settings ) {
		super(questionText, settings)
		this.widgets = widgets;
	}
	get widgets() {
		return this._widget;
	}
	set widgets(widgets) {
		this._widget = widgets;
	}
}
module.exports = WidgetQuestion;
