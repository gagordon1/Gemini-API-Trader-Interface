import React from 'react';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amountBought : 0,
      amountSold : 0,
      paidForBuys : 0,
      earnedFromSells : 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(()=> this.getItems(), 4000);
  }

  componentWillUnmount() {
    this.timer = clearInterval(this.timer); // here...
    this.timer = null
  }

  getItems() {
      fetch("http://localhost:8080/stats")
        .then(result => result.json())
        .then(result => this.setState({
            amountBought : result["amountBought"],
            amountSold : result["amountSold"],
            paidForBuys : result["totalPaidForBuys"],
            earnedFromSells : result["totalEarnedFromSells"]
        })
      );
  }
  render() {

    return (
      <div>
        <p> Amount Bought: {this.state.amountBought}</p>
        <p> Amount Sold: {this.state.amountSold}</p>
        <p> Total Paid for Buys: ${this.state.paidForBuys}</p>
        <p> Total Earned from Sells: ${this.state.earnedFromSells}</p>
      </div>
    )
  }
}
