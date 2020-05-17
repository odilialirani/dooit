import React from "react";
import { Link } from "react-router-dom";

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

    fetch('http://localhost:3000/logged_in', {
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
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  componentDidMount() {
    this.loginStatus()
  }

  render() {
    const loggedInPage = (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Dooit</h1>
            <p className="lead">
              Welcome { this.state.user.username }
            </p>
          </div>
        </div>
      </div>
    )

    const loggedOutPage = (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Dooit</h1>
            <p className="lead">
              Manage your duit, the smart way!
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
        </div>
      </div>
    )
    return(
      <div>
        { this.state.isLoggedIn ? loggedInPage : loggedOutPage }
      </div>
    )
  }
}

export default Home