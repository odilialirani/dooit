import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Container } from 'semantic-ui-react';

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
      [event.target.name] : event.target.value
    });
  }

  handleSubmit(event) {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let user = {
      username: this.state.username,
      password: this.state.password,
    }

    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: {user: JSON.stringify(user)}
    }).then(response => {
        console.log(response)
    })
  }

  render() {
    return(
      <Container>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />
            <Form.Input fluid label='Password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          <Form.Button fluid onClick={this.handleSubmit}>Submit</Form.Button>
        </Form>
      </Container>
    )
  }
}

export default Login;