import React, { Component } from 'react';
import './Login.css';
import AuthService from '../AuthService';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform form validation if needed
    if (!this.state.username || !this.state.password) {
      alert('Please enter both username and password.');
      return;
    }

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        // Assuming successful login, you can store the user token in local storage
        localStorage.setItem('userToken', res.token);
        window.open("/", "_self");
      })
      .catch(err => {
        alert("Oops! Something went wrong. Please check your credentials and try again.");
      });
  };

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              type="submit"
              onClick={this.handleFormSubmit}
              value="Login"
            />
          </form>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
}

export default Login;
