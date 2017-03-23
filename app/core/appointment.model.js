function Appointment(params){
	var self=this;
	var dateTime, purpose, message='';
	var status=Appointment.Started;

	(function(){
		if(!params){
			throw "Params required";
		}

		if(params.dateTime && params.dateTime instanceof Date){
			dateTime=params.dateTime;
		}


		if(params.purpose){
			purpose=params.purpose;
		}


		if(params.message){
			message=params.message;
		}

		if(params.status){
			status=params.status;
		}
	})();

	this.setMessage=function(messageInput){message=messageInput; };
	this.setDateTime=function(dateTimeInput){dateTime = dateTimeInput};
	this.setPurpose=function(purposeInput){ purpose = purposeInput; };

	this.decline=function(params){
		if(status == Appointment.PatientRequested){
			status = Appointment.Declined;
		}
		else{
			throw "Can only decline patient-requested appointments";
		}

		if(params && params.message){
			message=params.message;
		}

		return self;
	};

	this.cancel=function(){
		if(self.isInTheFuture()){
			status = Appointment.Cancelled;
			console.log('[Appointment] cancelled: ' + self.toString());
			return self;
		}
	};

	this.isPatientRequested=function(){
		return status == Appointment.PatientRequested;
	};

	this.isDeclined=function(){
		return status == Appointment.Declined;
	};

	this.isCancelled=function(){
		return status == Appointment.Cancelled;
	};

	this.isInTheFuture=function(){
		return dateTime.getTime() > new Date().getTime();
	};

	this.getDateTime=function(){
		return dateTime;
	};


	this.getPurpose=function(){
		return purpose;
	};

	this.getMessage=function(){return message; };

	this.toString=function(){
		return JSON.stringify(
			{
				appointment: {
					purpose: purpose,
					dateTime: dateTime.toLocaleString(),
					message: message,
					status: status,
					year: self.getDateTime().getYear()+'',
					month: self.getDateTime().getMonth()+'',
					day: self.getDateTime().getDate()+'',
					hour: self.getDateTime().getHours()+'',
					minute: self.getDateTime().getMinutes()+''
				}
			}
		);
	};

	this.toJson=function(){
		return self.toString();
	};
};

Appointment.PatientRequested='PatientRequested';
Appointment.Declined='Declined';
Appointment.DoctorScheduled='DoctorScheduled';
Appointment.Started='Started';
Appointment.Cancelled='Cancelled';

Appointment.findAppointment=function(appts, appt){
	if(!(appt instanceof Appointment)){
			throw "Appointment is required";
	}
	else if(!(appts instanceof Array)){
		throw "Appointment list required";
	}

	console.log('[Appointment] Searching for appt: '+appt);
	console.log('[Appointment] Num available appts: '+appts.length);

	const foundAppt = appts.find(function(availableAppt){
		console.log('[Appointment] Compare available appt: '+availableAppt);

		return availableAppt.getDateTime().getYear() == appt.getDateTime().getYear() &&
		availableAppt.getDateTime().getMonth() == appt.getDateTime().getMonth() &&
		availableAppt.getDateTime().getDate() == appt.getDateTime().getDate() &&
		availableAppt.getDateTime().getHours() == appt.getDateTime().getHours() &&
		availableAppt.getDateTime().getMinutes() == appt.getDateTime().getMinutes()
	});

	console.log("[Appointment] found appt: " + foundAppt);

	return foundAppt;
}

module.exports=Appointment;