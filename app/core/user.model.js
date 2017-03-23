var Patient = require('./patient/patient.model');
var Doctor = require('./doctor.model');

function User(params){
	var self=this;
	var username,password, userType;

	(function(){
		if(!params){
			throw "Params required";
		}

		if(params.username){
			username=params.username;
		}

		if(params.password){
			password=params.password;
		}	

		// e.g. Doctor
		if(params.userType){
			userType=params.userType;
		}
	})();

	this.setUsername=function(usernameInput){ username=usernameInput; };
	this.setPassword=function(passwordInput){ password=passwordInput; };
	this.setUserType=function(userTypeInput){ userType=usernameInput; };

	this.getUsername=function(){return username; };
	this.getPassword=function(){return password; };
	this.getUserType=function(){return userType; };

	this.toString=function(){
		return {username: username, userType: userType};
	};

	this.toJson=function(){
		return self.toString();
	};
}

User.login=function(username, password){
	return username instanceof String && 
	password instanceof String && accounts[username]==password;
};

module.exports=User;