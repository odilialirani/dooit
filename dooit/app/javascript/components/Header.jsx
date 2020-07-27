import React from "react";
import { Link } from "react-router-dom";
import { 
  Segment, Sticky, Menu, Rail, Button
} from "semantic-ui-react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch('/logout', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      credentials: 'same-origin'
    }).then(res => {
      window.location.replace("/");
    })
  }

  render() {
    return(
      <div>
        <Sticky>
          <Menu vertical>
            <Menu.Item>
              <Menu.Header>
                Hello
              </Menu.Header>
              <Menu.Item
                as = { Link } 
                name = 'home'
                active = { this.props.currentPage === 'home' }
                to = '/'
              />
              <Menu.Item
                as = { Link } 
                name = 'split'
                active = { this.props.currentPage === 'split' }
                to = '/split'
              />
              <Menu.Item
                as = { Link } 
                name = 'budget'
                active = { this.props.currentPage === 'budget' }
                to = '/budget'
              />
            </Menu.Item>
            <Menu.Item>
              <Button onClick={ this.handleLogout }>Logout</Button>
            </Menu.Item>
          </Menu>
        </Sticky>
      </div>
    );
  }
}

export default Header;