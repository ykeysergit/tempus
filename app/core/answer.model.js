module.exports=function Answer(params){
	var self=this;
	var text='';

	(function(){
		text=params.text;
	})();	

	this.setText=function(textInput){ text = textInput; };

	this.getText=function(){return text; };

	this.toString=function(){
		return {
			text: text
		};
	};

	this.toJson=function(){
		return self.toString();
	}
};