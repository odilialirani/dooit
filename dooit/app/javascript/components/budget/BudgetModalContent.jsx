import React from 'react';
import { 
  Modal, Button, Header, Input, Dropdown,
  Grid, Item
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
    
    this.submitCategory = this.submitCategory.bind(this);
    this.submitSpending = this.submitSpending.bind(this);
    this.submitBudget = this.submitBudget.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSelect(event, data) {
    this.setState({
      [data.name]: data.value
    });
  }


  submitBudget() {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let data = {
      category: this.state.selectedCategory,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      amount: this.state.budget_amount
    }
    
    fetch('/api/budget/v1/page/add_budget', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status == 200) {
        this.props.refreshData();
        this.props.closeModal();
      } else {
        console.log(response)
      }
    })
  }

  submitCategory() {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    let data = {
      title: this.state.title
    }

    fetch('/api/budget/v1/page/add_category', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status == 200) {
        console.log('done')
        this.props.refreshData();
        this.props.closeModal();
      } else {
        console.log(response)
      }
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
        this.props.refreshData();
        this.props.closeModal();
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
    let inlineStyle = {
      row: {
        margin: 0
      }
    }

    return(
      <Modal.Content>
        <Grid>
          <Grid.Row style={inlineStyle.row}>
            <Header sub>Add new budget</Header>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>Category</Item.Header>
              <Item.Content>
                <Dropdown
                  placeholder='Select Category'
                  fluid
                  selection
                  name='selectedCategory'
                  options={ this.props.categoryOptions }
                  onChange={ this.handleSelect }
                />
              </Item.Content>
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>Start Date</Item.Header>
              <Item.Content>
                <Input
                  name='start_date'
                  type='date'
                  value={this.state.start_date}
                  onChange={this.handleChange}
                />
              </Item.Content>
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>End Date</Item.Header>
              <Item.Content>
                <Input
                  name='end_date'
                  type='date'
                  value={this.state.end_date}
                  onChange={this.handleChange}
                />
              </Item.Content>
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>Amount</Item.Header>
              <Item.Content>
                <Input
                  name='budget_amount'
                  type='number'
                  value={this.state.budget_amount}
                  onChange={this.handleChange}
                />
              </Item.Content>
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row} columns={2}>
            <Grid.Column>
              <Button fluid positive onClick={this.submitBudget}>Submit</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid negative onClick={this.props.closeModal}>Cancel</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    )
  }

  categoryContent() {
    let inlineStyle = {
      row: {
        margin: 0
      }
    }

    return(
      <Modal.Content>
        <Grid>
          <Grid.Row style={inlineStyle.row}>
            <Header sub>Add new category</Header>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>TITLE</Item.Header>
              <Input
                name='title'
                value={this.state.title}
                onChange={this.handleChange}
              />
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row} columns={2}>
            <Grid.Column>
              <Button fluid positive onClick={this.submitCategory}>Submit</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid negative onClick={this.props.closeModal}>Cancel</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
    )
  }

  spendingContent() {
    let inlineStyle = {
      row: {
        margin: 0
      }
    }
    return(
      <Modal.Content>
        <Grid>
          <Grid.Row style={inlineStyle.row}>
            <Header sub>Add new spending</Header>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>LOCATION</Item.Header>
              <Item.Content>
                <Input
                  name='location'
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </Item.Content>
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>AMOUNT</Item.Header>
              <Item.Content>
                <Input
                  name='amount'
                  type='number'
                  value={this.state.amount}
                  onChange={this.handleChange}
                />
              </Item.Content>
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>DATE</Item.Header>
              <Item.Content>
                <Input
                  name='date'
                  type='date'
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              </Item.Content>
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row}>
            <Item>
              <Item.Header>BUDGET</Item.Header>
              <Item.Content>
                <Dropdown
                  placeholder='Select Budget'
                  fluid
                  selection
                  name='selectedBudget'
                  options={ this.props.budgetOptions }
                  onChange={ this.handleSelect }
                />
              </Item.Content>
            </Item>
          </Grid.Row>
          <Grid.Row style={inlineStyle.row} columns={2}>
            <Grid.Column>
              <Button fluid positive onClick={this.submitSpending}>Submit</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid negative onClick={this.props.closeModal}>Cancel</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
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