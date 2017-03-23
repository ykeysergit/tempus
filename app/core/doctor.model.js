var Appointment = require('./appointment.model');

function Doctor(params){
	var self=this;
	var name, user;	
	var appointments=[];

	(function(){
		if(!params){
			throw "Params required";
		}

		if(params.name){
			name=params.name;
		}

		if(params.user && params.user.getUsername().length>0){
			user=params.user;
		}else{
			throw "User info is required: "+params.user;
		}
	})();

	this.setName=function(nameInput){ name = nameInput; };
	this.setUser=function(userInput){ user = userInput; };

	this.addAppointment=function(appt){
		if(!appt){
			throw "Appointment is required";
		}

		appointments.push(appt);

		console.log("[Doctor] Added appointment: " + appt);
	};

	this.getName=function(){ return name; };
	this.getUser=function(){return user; };
	this.getAppointments=function(){return appointments; };

	this.toString=function(){
		return {
			doctor: {username: user.getUsername(), name: name}
		};
	};

	this.findAppointment=function(targetAppt){
		return Appointment.findAppointment(self.getAppointments(), targetAppt);
	}
};

Doctor.findByUsername=function(username){
	return Doctor.lookup[username];
}

module.exports=Doctor;

