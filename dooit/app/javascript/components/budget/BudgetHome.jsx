import React from 'react';
import { 
  Grid, Card, Button, Container,
  Statistic, Modal, Header, Input, 
  Dropdown
} from 'semantic-ui-react';
import SharedHeader from '../Header';
import _ from 'lodash'

class BudgetHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedBudget: '',
      openSpendingModal: false
    };

    this.getHomepageData = this.getHomepageData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.submitSpending = this.submitSpending.bind(this);
    this.openSpendingModal = this.openSpendingModal.bind(this);
    this.closeSpendingModal = this.closeSpendingModal.bind(this);
  }

  getHomepageData() {
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch('api/budget/v1/page/homepage', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => {
      return response.json()
    }).then(data => {
      let budgetOptions = _.map(data, (d, index) => ({
        key: d['budget_id'],
        text: d['title'],
        value: d['budget_id']
      }))

      this.setState({
        categories: data,
        budgetOptions: budgetOptions
      });
    });
  }

  componentDidMount() {
    this.getHomepageData();
  }

  handleChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  handleSelect(event, data) {
    this.setState({
      selectedBudget: data.value
    });
  }

  openSpendingModal() {
    this.setState({
      openSpendingModal: true
    })
  }

  closeSpendingModal() {
    this.setState({
      openSpendingModal: false
    })
  }

  submitSpending() {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let data = {
      date: this.state.date,
      budget_id: this.state.selectedBudget,
      amount: this.state.amount,
      location: this.state.location
    }

    fetch('/api/budget/v1/page/add_spending', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status == 200) {
        this.getHomepageData();
        this.setState({
          openSpendingModal: false
        })
      } else {
        console.log(response);
      }
    })
  }

  render() {
    // Fix modal not centered by default
    // rogue left: '0' in modal class causing modal to shift left
    const inlineStyle = {
      modal : {
        left: 'auto',
        height: 'auto',
        top: 'auto'
      }
    };

    let spendingModal = (
      <Modal style={inlineStyle.modal} open={this.state.openSpendingModal}>
        <Modal.Header>
          Add new spending
        </Modal.Header>
        <Modal.Content>
          <div>
            <Header sub>
              Location
            </Header>
            <Input 
              name='location'
              value={ this.state.location }
              onChange={ this.handleChange }
            />
          </div>
          <br />
          <div>
            <Header sub>
              Amount
            </Header>
            <Input 
              name='amount'
              type='number'
              value={ this.state.amount }
              onChange={ this.handleChange }
            />
          </div>
          <br />
          <div>
            <Header sub>
              Date
            </Header>
            <Input 
              name='date'
              type='date'
              value={ this.state.date }
              onChange={ this.handleChange }
            />
          </div>
          <br />
          <Header sub>
            Budget
          </Header>
          <Dropdown
            placeholder='Select Budget'
            fluid
            selection
            options={ this.state.budgetOptions }
            onChange={ this.handleSelect }
          />
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={this.submitSpending}>Submit</Button>
          <Button negative onClick={this.closeSpendingModal}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    )

    let cards = this.state.categories.map((data, index) =>
      <Card key={index}>
        <Card.Content>
          <Card.Header>{ data['title'] }</Card.Header>
          <Card.Description>
            <Statistic>
              <Statistic.Value>
                ${ data['budget_spent'] }
              </Statistic.Value>
              <Statistic.Label>
                / ${ data['budget_amount'] }
              </Statistic.Label>
            </Statistic>
          </Card.Description>
        </Card.Content>
        <Button>View</Button>
      </Card>
    )
    return(
      <Container>
        { spendingModal }
        <Grid centered columns={2}>
          <Grid.Column width={4}>
            <SharedHeader currentPage='budget' />
          </Grid.Column>
          <Grid.Column width={8}>
            <Grid.Row>
              <Card.Group>
                { cards }
              </Card.Group>
            </Grid.Row>
            <br />
            <Grid.Row>
              <Button onClick={this.openSpendingModal}>Add Spending</Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default BudgetHome;