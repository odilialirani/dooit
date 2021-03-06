import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Dooit</h1>
        <p className="lead">
          Manage your money, the smart way!
        </p>
        <hr className="my-4" />
        <Link
          to="/users"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Users
        </Link>
        <Link
          to="/login"
          className="btn btn-lg custom-button"
          role="button"
        >
          Login
        </Link>

        <Link
          to="/users/create"
          className="btn btn-lg custom-button"
          role="button"
        >
          Sign Up
        </Link>

      </div>
    </div>
  </div>
);