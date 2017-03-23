class Authenticator extends React.Component{
	static get url(){
		return 'login';
	}

	 constructor(props) {
    	super(props);

    	this.state={username: '', password: ''};

    	// This binding is necessary to make `this` work in the callback
    	this.updateUsername = this.updateUsername.bind(this);
    	this.updatePassword = this.updatePassword.bind(this);
    	this.login = this.login.bind(this);
  	}

  	updateUsername(evt){
  		this.setState({username: evt.target.value});
  	}

  	updatePassword(evt){
  		this.setState({password: evt.target.value});
  	}

  	login(evt){
  		console.log("Login with username " + this.state.username + " and password " + this.state.password);

  		jQuery.ajax({
  			url: Authenticator.url,
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
  					console.log("[Authenticator] Response: " + JSON.stringify(data));
  				}
  			}
  		}).fail(function(jqXHR, textStatus, errorThrown){
  			console.log("[Authenticator][fail] status: " + jqXHR.status);
  			console.log("[Authenticator][fail] textStatus: " + textStatus);
  			console.log("[Authenticator][fail] errorThrown: " + errorThrown);
  		}).always(function(){
          ReactDOM.render(
             <Dashboard />,
             document.getElementById('root')
          );
      });
  	}

	render(){
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
