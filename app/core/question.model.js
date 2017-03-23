const Answer = require('./answer.model');

module.exports=function Question(params){
	var self=this;
	var answers=[], text='';

	(function(){
		if(!params){
			throw "Params required";
		}

		if(params.text){
			text=params.text;
		}	

		if(params.answers){
			answers=params.answers;
		}
	})();

	this.addAnswer=function(answer){ 
		if(!(answer instanceof Answer)){
			throw "Answer is required";
		}

		answers.push(answer); 

		console.log("[Question] Answer added: " + answer);
	};

	this.getAnswers=function(){ return answers; };

	this.toString=function(){
		return {
			question: text,
			answers: answers.map(
					function(answer){ return answer.toJson(); }
				)
		};
	};

	this.toJson=function(){
		return self.toString();
	};
};