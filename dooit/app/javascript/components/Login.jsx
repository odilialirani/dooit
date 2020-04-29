import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.username,
      password: event.target.password
    });
  }

  handleSubmit(event) {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let user = {
      username: this.state.username,
      password: this.state.password,
    }

    fetch('http://localhost:3000/api/v1/users/create', {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: {user: JSON.stringify(user)}
    }).then(response => {
        console.log(response)
    })
    // event.preventDefault();
  }

  render() {
    return(
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <form onSubmit={this.handleSubmit}>
              <label>
                Username:
                <input type="text" value={this.state.username} onChange={this.handleChange} />
              </label>
              <label>
                Password:
                <input type="password" value={this.state.password} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;