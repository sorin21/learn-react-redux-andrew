class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.counter,
      name: 'Daniel'
    };
    this.addOne = this.addOne.bind(this);
    this.minusOne = this.minusOne.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    try {
      const newCounter = localStorage.getItem('counter');

      if (isNaN(newCounter)) {
        this.setState(() => ({ counter: newCounter}))
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.counter !== this.state.counter) {
      localStorage.setItem('counter', +this.state.counter);
    }
  }
  

  addOne() {
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1
      }
    })
  }

  minusOne() {
    this.setState((prevState) => {
      return {
        counter: prevState.counter - 1
      }
    })
  }

  reset() {
    this.setState((prevState) => {
      return {
        counter: 0
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.counter}</h1>
        <button onClick={this.addOne}>+1</button>
        <button onClick={this.minusOne}>-1</button>
        <button onClick={this.reset}>reset</button>
      </div>
    );
  }
}

Counter.defaultProps = {
  counter: 2
}

ReactDOM.render(<Counter />, document.getElementById('app'));

