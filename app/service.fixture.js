const User = require('./core/user.model');
const Patient = require('./core/patient/patient.model');
const Doctor = require('./core/doctor.model');

User.accountLookup={
	doctor1: new User({username: 'doctor1', password: 'doc123', userType: Doctor.name}),
	patient1: new User({username: 'patient1', password: 'pat123', userType: Patient.name}),
	patient2: new User({username: 'patient2', password: 'pat456', userType: Patient.name})
};

// key: username
Patient.lookup={
	"patient1": new Patient({
		name: 'andy',
		user: User.accountLookup.patient1, 
		email: 'pat123@gmail.com', 
		age: 45, 
		phone: '312-434-4333'
		}),
	"patient2": new Patient({
		name: 'mike',
		user: User.accountLookup.patient2,
		email: 'pat456@gmail.com',
		age: 34,
		phone: '312-544-3433'
	})
};

// key: username
Doctor.lookup={
	"doctor1": new Doctor({
		user: User.accountLookup.doctor1,
		name: 'john'
	})
};
