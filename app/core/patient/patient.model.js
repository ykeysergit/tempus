const File = require('./file.model');
const Appointment = require('../appointment.model');
const Question = require('../question.model');

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    jQuery = require("jquery")(window);
});

function Patient(params){
	var self=this;
	var name='', age, email='', mailingAddress='', phone='',
	questions=[], files=[], user, appointments=[];

	(function init(){
		if(!params){
			throw "Params required";
		}

		if(params.name){
			name = params.name;
		}

		if(params.age){
			age= parseInt(params.age);
		}

		if(params.email){
			email = params.email;
		}

		if(params.mailingAddress){
			mailingAddress=params.mailingAddress;
		}

		if(params.phone){
			phone=params.phone;
		}

		if(params.user && params.user.getUsername().length>0){
			user=params.user;
		}else{
			throw "User info is required: "+params.user;
		}

		if(params.appointments){
			appointments=params.appointments;
		}
	})();

	this.getUser=function(){ return user; };
	this.getName=function(){ return name; };
	this.getAge=function(){ return age; };
	this.getEmail=function(){ return email; };
	this.getMailingAddress=function(){ return mailingAddress; };
	this.getPhone=function(){ return phone; };
	this.getFiles=function(){ return files; };
	this.getQuestions=function(){return questions; };
	this.getAppointments=function(){ return appointments; };

	this.addFile=function(file){
		if(!(file instanceof File)){
			throw "file is required";
		}

		files.push(file); 

		console.log("[Patient] File added: " + file);
	};

	this.removeFile=function(file){
		var foundIndex=-1;
		var fileRemoved=null;

		files.find(function(file, index){
			if(foundIndex==-1 && file instanceof File && file.getFilename() == file.getFilename()){
				foundIndex=index;
				fileRemoved=file;
				return true;
			}
		});

		files.splice(foundIndex, 1);
		return fileRemoved;
	};

	this.setName=function(nameInput){ name=nameInput; };
	this.setAge=function(ageInput){ age=ageInput; };
	this.setEmail=function(emailInput){ email = emailInput; };
	this.setMailingAddress=function(mailingAddressInput){ mailingAddress=mailingAddressInput; };
	this.setPhone=function(phoneInput){ phone=phoneInput; };
	this.setUser=function(userInput){ user = userInput; };

	this.addAppointment=function(appt){ 
		if(!(appt instanceof Appointment)){
			throw "Appointment is required";
		}

		appointments.push(appt); 
		console.log("[Patient] Added appointment: " + appt);
	};

	this.addQuestion=function(question){
		if(!(question instanceof Question)){
			throw "question is required";
		}

		questions.push(question);

		console.log("[Patient] Question added: " + question);
	};

	this.toString=function(){
		return JSON.stringify({
			patient: {username: user.getUsername(), name: name, age: age, email: email}
		});
	};

	this.toJson=function(){
		return self.toString();
	};

	this.findAppointment=function(targetAppt){
		return Appointment.findAppointment(self.getAppointments(), targetAppt);
	};
}

Patient.findByName=function(name){
	console.log('[Patient][foundByName] Find by name: '+name);

	if(!(name instanceof String) && !name){
		throw 'Name is invalid: '+name;
	}

	var foundPatient=Patient.all().find(function(patient){
		return patient.getName() == name;
	});

	if(foundPatient){
		console.log('[Patient][foundByName] Found with name '+name);
	}

	return foundPatient;
};

Patient.all=function(){
	return jQuery.map(Patient.lookup,function(value, key){
			return value;
			});
};

Patient.findByUsername=function(username){
	if(!username){
		throw "Username is required";
	}

	return Patient.lookup[username];
}

module.exports=Patient;