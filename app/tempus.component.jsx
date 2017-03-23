class Tempus extends React.Component{
	static get url(){
		return 'login';
	}

  static get patientType(){
    return 'Patient';
  }

  static get doctorType(){
    return 'Doctor';
  }

  static get loginStatus(){
    return 'loginStatus';
  }

  static get doctorLoggedIn(){
    return 'doctorLoggedIn';
  }

  static get patientLoggedIn(){
    return 'patientLoggedIn';
  }

	 constructor(props) {
    	super(props);

    	this.state={username: '', password: '', status: Tempus.loginStatus};

    	// This binding is necessary to make `this` work in the callback
    	this.updateUsername = this.updateUsername.bind(this);
    	this.updatePassword = this.updatePassword.bind(this);
    	this.login = this.login.bind(this);
  	}

  	updateUsername(evt){
  		this.state.username=evt.target.value;
  	}

  	updatePassword(evt){
  		this.state.password=evt.target.value;
  	}

  	login(evt){
  		console.log("[Tempus][login] Login with username " + this.state.username + " and password " + this.state.password);

      var userLoginResponse=null;

  		jQuery.ajax({
  			url: Tempus.url,
  			async: false,
  			method: 'POST',
  			contentType: 'application/json',
  			dataType: 'json',
  			data: JSON.stringify({
  				user:{
  					username: this.state.username,
  					password: this.state.password
  				}
  			}),
  			success: function(data, textStatus, jqXHR){
  				if(jqXHR.status == 200){
  					console.log("[Tempus][login] Response: " + JSON.stringify(data));
            userLoginResponse=data;
  				}
  			}
  		}).fail(function(jqXHR, textStatus, errorThrown){
  			console.log("[Tempus][fail] status: " + jqXHR.status);
  			console.log("[Tempus][fail] textStatus: " + textStatus);
  			console.log("[Tempus][fail] errorThrown: " + errorThrown);
  		}).always(function(){
         let nextStatus=this.state.status;

        if(userLoginResponse.userType == Tempus.doctorType){
          nextStatus=Tempus.doctorLoggedIn;
        }
        else if(userLoginResponse.userType == Tempus.patientType){
          nextStatus = Tempus.patientLoggedIn;
        }

        this.setState({
          userType: userLoginResponse.userType,
          status: nextStatus
        });
      }.bind(this));
  	}

	render(){
		if(this.state.status == Tempus.doctorLoggedIn){
      return (
          <h1>Doctor logged-in</h1>
        );
    }
    else if(this.state.status == Tempus.patientLoggedIn){
      return (
          <h1>Patient logged-in</h1>
        );
    }
    else{
      return ( 
          <div>
                  <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"></img>
                  <p id="profile-name" className="profile-name-card"></p>
                  <form className="form-signin">
                      <input type="text" id="inputUsername" className="form-control" onChange={this.updateUsername}
                      placeholder="Username" required autofocus></input>

                      <input type="password" id="inputPassword" className="form-control" onChange={this.updatePassword}
                      placeholder="Password" required></input>

                      <button className="btn btn-lg btn-primary btn-block btn-signin"
                      type="button" onClick={this.login}>Sign in</button>
                  </form>
                </div>
              );
    }
	}
}
