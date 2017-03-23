const varstring = require('varstring');
const fs = require('fs');

function File(params){
	var self=this;
	var filename='default.txt';
	var patient;
	var buffer;

	(function(){
		if(!params){
			throw "Params required";
		}

		if(params.filename){
			filename=params.filename;
		}

		if(params.patient){
			patient=params.patient;
		}

		if(params.buffer){
			buffer=params.buffer;
		}
	})();

	this.getFilename=function(){ return filename; };
	this.getPatient=function(){return patient; };
	this.getBuffer=function(){return buffer;};

	this.setFilename=function(filenameInput){ filename=filenameInput; };
	this.setPatient=function(patientInput){ patient=patientInput; };
	this.setBuffer=function(bufferInput){buffer=bufferInput; };

	this.save=function(){
		const interpolatedStorageDir = varstring(File.storageDir, patient.getUser().getUsername());

		fs.writeFileSync(interpolatedStorageDir+'/'+filename, buffer);
		return self;
	};

	this.toString=function(){
		return JSON.stringify({
			filename: filename,
			patient: patient.toJson()
		});
	};
};

File.storageDir='./database/{username}/files';

module.exports=File;