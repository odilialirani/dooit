import React from "react";
import { Link } from "react-router-dom";
import logo from '../static/images/DOOIT.png'
import { Grid, Button } from 'semantic-ui-react'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }


  loginStatus() {
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch('/logged_in', {
      method: "GET",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(data => {
      if (data.logged_in) {
        this.handleLogin(data)
      } else {
        this.handleLogout()
      }
    })
  }

  handleLogin(data) {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout() {
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch('/logout', {
      method: 'POST',
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      credentials: 'same-origin'
    }).then(res => {
      console.log(res)
      this.setState({
        isLoggedIn: false,
        user: {}
      })
    })
  }

  componentDidMount() {
    this.loginStatus()
  }

  render() {
    const loggedInPage = (
      <Grid>
        <Grid.Row>
          <Button onClick={ this.handleLogout }>Logout</Button>
        </Grid.Row>
        <Grid.Row>
          <p className="lead">
            Welcome { this.state.user.username }
          </p>
        </Grid.Row>
        <Grid.Row columns={ 3 }>
          <Grid.Column>
            <Link
              to="/split"
              className="btn btn-lg custom-button"
              role="button"
            >
              Split
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Button>Stock</Button>
          </Grid.Column>
          <Grid.Column>
            <Button>Analytics</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )

    const loggedOutPage = (
      <div>
        <p className="lead">
          Manage your money, the smart way!
        </p>
        <hr className="my-4" />
        <Link
          to="/login"
          className="btn btn-lg custom-button"
          role="button"
        >
          Login
        </Link>

        <Link
          to="/sign_up"
          className="btn btn-lg custom-button"
          role="button"
        >
          Sign Up
        </Link>
      </div>
    )

    return(
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <img src={ logo } />
            <div>
              { this.state.isLoggedIn ? loggedInPage : loggedOutPage }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home