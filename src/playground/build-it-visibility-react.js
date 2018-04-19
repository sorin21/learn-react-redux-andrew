class BuiltItVisibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.onShowDetails = this.onShowDetails.bind(this);
  }

  onShowDetails() {
    this.setState((prevState) => {
      return {
        show: !prevState.show
      }
    })
  }

  render() {
    const randomFunny = [
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
      "So many books, so little time.",
      "You only live once, but if you do it right, once is enough.",
      "A day without sunshine is like, you know, night."
    ];

    return (
      <div>
        <h1>Visibility Toogle</h1>
        <button onClick={this.onShowDetails}>{this.state.show ? 'Hide quote' : 'Show quote'}</button>
        {this.state.show ? <p>{randomFunny[Math.floor(Math.random() * randomFunny.length)]}</p> : ''}
      </div>
    );
  }
}

ReactDOM.render(<BuiltItVisibility />, document.getElementById('app'));

