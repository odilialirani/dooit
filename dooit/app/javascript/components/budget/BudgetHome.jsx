import React from 'react';
import { 
  Grid, Card, Button, Container,
  Statistic, Modal, Header, Input, 
  Dropdown
} from 'semantic-ui-react';
import SharedHeader from '../Header';
import BudgetModalContent from './BudgetModalContent';
import _ from 'lodash'

class BudgetHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedBudget: '',
    };

    this.getHomepageData = this.getHomepageData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.openBudgetModal = this.openBudgetModal.bind(this);
    this.closeBudgetModal = this.closeBudgetModal.bind(this);
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

  openBudgetModal() {
    this.setState({
      openBudgetModal: true
    })
  }

  closeBudgetModal() {
    this.setState({
      openBudgetModal: false
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
        <Modal style={inlineStyle.modal} size='small' open={this.state.openBudgetModal}>
          <Modal.Header>DOOIT:Budget - ADD</Modal.Header>
          <BudgetModalContent closeModal={this.closeBudgetModal} budgetOptions={this.state.budgetOptions} refreshData={this.getHomepageData}/>
        </Modal>
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
              <Grid.Column>
                <Button onClick={this.openBudgetModal}>Add</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default BudgetHome;