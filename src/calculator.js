/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/

var Calculator = React.createClass({
  // HELPER METHODS
  calcPir: function() {
    // formula for calculating periodic interest rate
    // ((1+(iR÷2))^2)^(1÷12)−1
    var iR = this.state.interestRate/100;
    var powerA = 1+(iR/2);
    var powerB = (1/12);
    return Math.pow(Math.pow(powerA,2),powerB)-1;
  },

  calcPmp: function() {
    /*
        formula for calculating monthly payments
        Ip: initial principal
        Pir: period interest rate
        m: ammortizaiton period in months
        (Ip*Pir)/(1-(1+Pir)^(-m))
    */
    var Ip  = this.state.homePrice - this.state.depositAmount;
    var Pir = this.calcPir();
    var m   = this.state.amortizationPeriod * 12;

    return (Ip*Pir)/(1-Math.pow(1+Pir, m*-1));
  },


  getInitialState: function() {
      return {
        homePrice: 400000,
        depositAmount: 80000,
        amortizationPeriod: 25,
        interestRate: 3.5
      };
  },

  priceChange: function(e) {
    this.setState({homePrice: Number(e.target.value)});
  },
  depositChange: function(e) {
    this.setState({depositAmount: Number(e.target.value)});
  },
  interestRate: function(e) {
    this.setState({interestRate: e.target.value});
    console.log({Pir: this.calcPir(), Pmp: this.calcPmp()});
  },
  amortizationPeriod: function(e) {
    this.setState({amortizationPeriod: Number(e.target.value)});
  },
  loanAmount: function() {
    return Number(this.state.homePrice) - Number(this.state.depositAmount);
  },

  render: function() {
    var loanAmount = this.loanAmount();
    return (
      <AndyForm>
        <AndyInput name="homePrice" value={this.state.homePrice} />
        <AndyInput name="depositAmount" value={this.state.depositAmount} />
        // etc.
      </AndyForm>
    );
  }
});


React.render(<Calculator />,
  document.getElementById('calculator')
);
