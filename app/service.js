const Express = require('express');
const app = Express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const User = require('./core/user.model');
const Patient = require('./core/patient/patient.model');
const Doctor = require('./core/doctor.model');
const Appointment = require('./core/appointment.model');
const File = require('./core/patient/file.model');
const Question = require('./core/question.model');

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    jQuery = require("jquery")(window);
});

(function init(){
	require('./service.fixture');
	app.use(fileUpload());
	app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  		extended: false
	})); 

	app.use(Express.static('../app'));
})();


app.get('/patients/:username/appointments', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundPatient = Patient.findByUsername(req.params.username);

	if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.params.username);
		return;
	}

	const appointmentsJson = JSON.stringify(foundPatient.getAppointments().map(
			function(appt){
				return appt.toJson();
			}
		)
	);

	resp.type('json').send(appointmentsJson);
});

/*
e.g.
{
	question: {
		text: "text"
	}
}
*/
app.post('/patients/:username/questions', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundPatient = Patient.findByUsername(req.params.username);

	if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.body.patient.username);
		return;
	}
	else if(!req.body.question){
		resp.status(404).send('Question is required');
	}
	else if(!req.body.question.text){
		resp.status(500).send("Question text is required");
	}

	const newQuestion = new Question({text: req.body.question.text});
	foundPatient.addQuestion(newQuestion);
	resp.type('json').send(newQuestion.toJson());
});

app.get('/patients/:username/questions', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundPatient = Patient.findByUsername(req.params.username);

	if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.body.patient.username);
		return;
	}

	const questionsJson = JSON.stringify(
			foundPatient.getQuestions().map(function(question){
				return question.toJson();
			})
		);

	resp.type('json').send(questionsJson);
});

/*
e.g.
{	
	appointment:{
		purpose: "check-up",
		message:"",
		year: 2017,
		month: 0 // January,
		day: 25 // day of the month
		hour: 13 // 24-hour
		minute: 30 // minute of the hour
	}
}
*/
app.post('/patients/:username/appointments', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundPatient = Patient.findByUsername(req.params.username);

	if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.params.username);
		return;
	}
	else if(!req.body.appointment){
		resp.status(500).send("Appointment is required");
		return;
	}
	else if(!req.body.appointment.year){
		resp.status(500).send("Appointment year is required");
		return;
	}
	else if(!req.body.appointment.day){
		resp.status(500).send("Appointment day is required");
		return;
	}
	else if(!req.body.appointment.month){
		resp.status(500).send("Appointment month is required");
		return;
	}
	else if(!req.body.appointment.hour){
		resp.status(500).send("Appointment hour is required");
		return;
	}
	else if(!req.body.appointment.minute){
		resp.status(500).send("Appointment minute is required");
		return;
	}
	else if(!req.body.appointment.purpose){
		resp.status(500).send("Appointment purpose is required");
		return;
	}

	const apptDateTime=new Date(
			parseInt(req.body.appointment.year),
			parseInt(req.body.appointment.month),
			parseInt(req.body.appointment.day),
			parseInt(req.body.appointment.hour),
			parseInt(req.body.appointment.minute)
		);

	const newAppt = new Appointment({dateTime: apptDateTime, 
		purpose: req.body.appointment.purpose, 
		message: req.body.appointment.message,
		status: Appointment.PatientRequested
	});

	foundPatient.addAppointment(newAppt);

	resp.type('json').send(newAppt.toJson());
});

app.delete('/patients/:username/files/:filename', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundPatient = Patient.findByUsername(req.params.username);

	if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.params.username);
		return;
	}
	if(!req.params.filename){
		resp.status(404).send('Filename is required');
		return;
	}

	const searchFile = new File();
	const fileRemoved = foundPatient.removeFile(searchFile);
});

/*
appointment:{
		purpose: "check-up",
		message:"",
		year: "2017",
		month: "0" // January,
		day: "25" // day of the month
		hour: "13" // 24-hour
		minute: "30" // minute of the hour
		status: "Declined"
	}
*/
app.put('/patients/:username/appointments', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundPatient = Patient.findByUsername(req.params.username);

	if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.params.username);
		return;
	}
	else if(!req.body.appointment){
		resp.status(500).send("Appointment is required");
		return;
	}
	else if(!req.body.appointment.year){
		resp.status(500).send("Appointment year is required");
		return;
	}
	else if(!req.body.appointment.day){
		resp.status(500).send("Appointment day is required");
		return;
	}
	else if(!req.body.appointment.month){
		resp.status(500).send("Appointment month is required");
		return;
	}
	else if(!req.body.appointment.hour){
		resp.status(500).send("Appointment hour is required");
		return;
	}
	else if(!req.body.appointment.minute){
		resp.status(500).send("Appointment minute is required");
		return;
	}
	else if(!req.body.appointment.purpose){
		resp.status(500).send("Appointment purpose is required");
		return;
	}

	const apptDateTime=new Date(
			parseInt(req.body.appointment.year),
			parseInt(req.body.appointment.month),
			parseInt(req.body.appointment.day),
			parseInt(req.body.appointment.hour),
			parseInt(req.body.appointment.minute)
		);

	const existingAppt = new Appointment({dateTime: apptDateTime});
	const foundAppt = foundPatient.findAppointment(existingAppt);

	console.log("Found appt: " + foundAppt);

	if(!foundAppt){
		resp.status(404).send('Appointment at '+apptDateTime.toLocaleString() + ' '+
			'not found ' + 
			'for patient ' + foundPatient.getUser().getUsername());
		return;
	}

	if(foundAppt.isPatientRequested() && req.body.appointment.status == Appointment.Declined){
		foundAppt.decline();
		foundAppt.setMessage(req.body.appointment.message);
		resp.type('json').send(foundAppt.toJson());
	}else if(foundAppt.isPatientRequested() && req.body.appointment.status == Appointment.Cancelled){
		foundAppt.cancel();
		resp.type('json').send(foundAppt.toJson());
	}
	else{
		resp.status(500).send("Appointment not declined because it is not patient-requested");
	}
});

/*
e.g.
{
	patient:{
		username: 'patient1'
	},
	appointment:{
		purpose: "check-up",
		message:"",
		year: 2017,
		month: 0 // January,
		day: 25 // day of the month
		hour: 13 // 24-hour
		minute: 30 // minute of the hour
	}
}
*/
app.post('/doctors/:username/appointments', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundDoctor = Doctor.findByUsername(req.params.username);
	const foundPatient = Patient.findByUsername(req.body.patient.username);

	if(!foundDoctor){
		resp.status(404).send('Doctor not found with username '+req.params.username);
		return;
	}
	else if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.body.patient.username);
		return;
	}
	else if(!req.body.appointment){
		resp.status(500).send("Appointment is required");
		return;
	}
	else if(!req.body.appointment.year){
		resp.status(500).send("Appointment year is required");
		return;
	}
	else if(!req.body.appointment.day){
		resp.status(500).send("Appointment day is required");
		return;
	}
	else if(!req.body.appointment.month){
		resp.status(500).send("Appointment month is required");
		return;
	}
	else if(!req.body.appointment.hour){
		resp.status(500).send("Appointment hour is required");
		return;
	}
	else if(!req.body.appointment.minute){
		resp.status(500).send("Appointment minute is required");
		return;
	}
	else if(!req.body.appointment.purpose){
		resp.status(500).send("Appointment purpose is required");
		return;
	}

	const apptDateTime=new Date(
			parseInt(req.body.appointment.year),
			parseInt(req.body.appointment.month),
			parseInt(req.body.appointment.day),
			parseInt(req.body.appointment.hour),
			parseInt(req.body.appointment.minute)
		);

	const newAppt = new Appointment({dateTime: apptDateTime, 
		purpose: req.body.appointment.purpose, 
		message: req.body.appointment.message,
		status: Appointment.DoctorScheduled
	});

	foundDoctor.addAppointment(newAppt);
	foundPatient.addAppointment(newAppt);

	resp.type('json').send(newAppt.toJson());
});

app.get('/patients', function(req, resp){
	console.log("Query string: " + JSON.stringify(req.query));
	const foundPatientByName = Patient.findByName(req.query.name);

	if(req.query.name && !foundPatientByName){
		resp.status(404).send('Patient('+req.query.name+') not found');
	}else if(req.query.name && foundPatientByName){
		resp.type('json').send(foundPatientByName.toJson());
	}else{
		const patientsJson = jQuery.map(Patient.all(),function(patient){
		return patient.toJson();
		});

		resp.type('json').send(JSON.stringify(patientsJson));
	}	
});
/*
e.g.
{
	"user":
	{
		"username": "doctor1",
		"password": "doc123"
	}
}
*/
app.post('/login', function(req, resp){
	console.log('Req body: ' + JSON.stringify(req.body));
	console.log('Req params: ' + JSON.stringify(req.params));

	if(!req.body.user){
		resp.status(500).send('user credentials not provided');
		return;
	}

	const foundUser = User.accountLookup[req.body.user.username];

	if(foundUser && foundUser.getPassword()==req.body.user.password){
		resp.type('json').send(foundUser.toJson());
	}
	else{
		resp.status(401).send('User('+req.body.username+') not authorized');
	}
});

// Upload a patient file
app.post('/patients/:username/files', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundPatient = Patient.findByUsername(req.params.username);

	if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.params.username);
		return;
	}

	if (!req.files || req.files.length == 0){
    	return res.status(400).send('No files were uploaded.');
	}

	const inputFile = req.files.file;
	const newFile = new File({filename: file.name, buffer: req.files.data, patient: foundPatient});	

	foundPatient.addFile(newFile);
	resp.type('json').send(newFile.toJson());
});

app.get('/patients/:username/files', function(req, resp){
	console.log("Route params: "+JSON.stringify(req.params));
	console.log("Req body: "+JSON.stringify(req.body));

	const foundPatient = Patient.findByUsername(req.params.username);

	if(!foundPatient){
		resp.status(404).send('Patient not found with username '+req.params.username);
		return;
	}

	let filesJson = JSON.stringify(
				foundPatient.getFiles().map(
					function(file){
					return file.toJson();
				}
			)
		);

	resp.type('json').send(filesJson);
});

// ping
app.get('/', function(req, resp){
	res.redirect('/index.html');
});

app.listen(8080, function(){
	console.log('Tempus app listening on port 8080');
});