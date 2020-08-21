import React, {useRef} from 'react';

export default function Login() {

  const handleSubmission = (event) => {

  };

  return (
      <div className="container">
          <form onSubmit="setTimeout(function(){window.location.reload();},10);" className="form-signin" method="post" action="/login">
              <h2 className="form-signin-heading">Please sign in</h2>
              <div className="alert alert-danger" role="alert">Username doesn't exist</div>
              <p>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input type="text" id="username" name="username" className="form-control" placeholder="Username"
                         required="" autoFocus="" />
              </p>
              <p>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                         required="" />
              </p>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
      </div>
  );
}
