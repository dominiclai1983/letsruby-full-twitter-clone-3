import React, {useState} from 'react';
import Layout from './layout';
import $ from 'jquery';

const Signup = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const newUser = {
    email,
    username,
    password
  }
 
  const handleSubmit = () => {

    var request = {
      type: 'POST', 
      url: 'api/users',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: {
        user: newUser
      },
      success: function (response) {
        console.log(response);
      },
      error: function (request, errorMsg) {
        console.log(request, errorMsg);
      }
    }
    $.ajax(request);
  };

  return (
    <Layout>
      <h1>Create Your Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newInputUserName">Username</label>
          <input type="text" className="form-control" id="exampleUsername" placeholder="username" 
          onChange = {event => {
            event.preventDefault();
            setUsername(event.target.value)}} />
        </div>
        <div className="form-group">
          <label htmlFor="newInputEmail">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" 
          onChange = {event => {
            event.preventDefault();
            setEmail(event.target.value)}} />
        </div>
        <div className="form-group">
        <label htmlFor="newInputPassword">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange = {event => {
          event.preventDefault(); 
          setPassword(event.target.value)}} />
        <small>At latest SIX characters</small>
        </div>
      <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </Layout>
  )
}

export default Signup;