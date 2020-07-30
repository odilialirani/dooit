import React from 'react';
import { 
  Modal, Button, Header, Input, Dropdown,
  Grid
} from 'semantic-ui-react';
import _ from 'lodash'

class BudgetModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createType: '',
      open: false,
    }

    this.initialContent = this.initialContent.bind(this);
    this.budgetContent = this.budgetContent.bind(this);
    this.categoryContent = this.categoryContent.bind(this);
    this.spendingContent = this.spendingContent.bind(this);
    this.submitSpending = this.submitSpending.bind(this);
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

  initialContent() {
    let inlineStyle = {
      row: {
        margin: 0
      }
    }

    return(
      <Modal.Content>
        <Grid>
          <Grid.Row style={inlineStyle.row} columns={3}>
            <Grid.Column>
              <Button
                fluid 
                onClick={() => this.setState({createType: 'category'})}
              >
                Category
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                fluid 
                onClick={() => this.setState({createType: 'budget'})}
              >
                Budget
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                fluid 
                onClick={() => this.setState({createType: 'spending'})}
              >
                Spending
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Button fluid negative onClick={this.props.closeModal}>Cancel</Button>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    )
  }

  budgetContent() {
    return(
      <Modal.Content>
        <Button>
          Category
        </Button>
      </Modal.Content>
    )
  }

  categoryContent() {
    return(
      <Modal.Content>

      </Modal.Content>
    )
  }

  spendingContent() {
    return(
      <div>
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
          options={ this.props.budgetOptions }
          onChange={ this.handleSelect }
        />
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={this.submitSpending}>Submit</Button>
        <Button negative onClick={this.closeSpendingModal}>Cancel</Button>
      </Modal.Actions>
      </div>
    )
  }

  contentRender() {
    switch(this.state.createType) {
      case 'budget':
        return this.budgetContent()
      case 'category':
        return this.categoryContent()
      case 'spending':
        return this.spendingContent()
      default:
        return this.initialContent()
    }
  }

  render() {
    return(
      this.contentRender()
    )
  }
}

export default BudgetModalContent;