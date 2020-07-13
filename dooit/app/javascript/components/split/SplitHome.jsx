import React from 'react';
import { Form, Container, Grid } from 'semantic-ui-react';
import logo from '../../static/images/DOOIT.png'
import axios from 'axios';

class SplitHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: [],
      selectedFile: null
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }

  getRecentReceipts() {

  }

  handleChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  handleUpload(event) {
    let token = document.querySelector('meta[name="csrf-token"]').content;
    var data = new FormData();
    data.append('file', this.state.selectedFile)
    console.log(data)
    // fetch('/api/split/v1/receipts/upload', {
    //   method: 'POST',
    //   headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'X-CSRF-Token': token,
    //     "Content-Type": "application/json",
    //     'Accept': 'application/json'
    //   },
    //   credentials: 'same-origin',
    //   body: data
    // }).then(response => {
    //   console.log(response)
    // })
  }

  render() {
    return(
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <div>
              <Grid>
                <Grid.Row>
                  <Form>
                    <Form.Input type='file' name='receiptFile' onChange={this.handleChange}/>
                    <Form.Button fluid onClick={this.handleUpload}>Submit</Form.Button>
                  </Form>
                </Grid.Row>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default SplitHome;