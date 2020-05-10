import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({
      [event.target.name] : event.target.value
    });

  }

  handleSubmit(event) {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let user = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    }

    console.log(user)
    fetch('http://localhost:3000/api/v1/users/create', {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(response => {
        console.log(response)
    })
    event.preventDefault();
  }

  render() {
    return(
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <form onSubmit={this.handleSubmit}>
              <label>
                Username:
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
              </label>
              <label>
                Password:
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
              </label>
              <label>
                First Name:
                <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
              </label>
              <label>
                Last Name:
                <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp;