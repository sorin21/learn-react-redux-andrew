class ReactApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const parseOptions = JSON.parse(json);

      if (parseOptions) {
        this.setState(() => ({ options: parseOptions }))
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
      // console.log('componentDidUpdate saving data', parseJSON);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }


  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
    // this.setState(() => {
    //   return {
    //     options: []
    //   }
    // })
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      // filter will add the option if we return true
      // and will delete option if we return false
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  }

  handlePick() {
    console.log('handlePick', this.state.options[Math.floor(Math.random() * this.state.options.length)]);
  }

  handleAddOption(option) {
    // if there is an empty string
    if (!option) {
      return 'Enter a valid value';
      // if option already exists in the aray
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists'
    }

    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }

  render() {
    const subtitle = 'Decide what you want to do with ReactJS.'

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick} />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption} />
        <AddOptions
          handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

ReactApp.defaultProps = {
  options: []
}


const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
  title: 'React App'
};


const Action = (props) => {
  return (
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}>What should I do?
        </button>
    </div>
  );
}


const Options = (props) => {
  return (
    <div>
      {props.options.length === 0 && <p> Please add an option to start!</p>}
      {props.options.map((option, index) => {
        return <Option
          key={index}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption} />
      })}
      <button onClick={props.handleDeleteOptions}>Remove All</button>
    </div>
  );
}


const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={(event) => props.handleDeleteOption(props.optionText)}> remove
      </button>
    </div>
  );
}


class AddOptions extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      // no error
      error: undefined
    }
  }

  // submit handler method
  handleAddOption(event) {
    event.preventDefault();

    let option = event.target.elements.option.value.trim();
    // handleAddOption() passed down from parent
    // and send back to parent the option
    // if an error comes back
    const error = this.props.handleAddOption(option);
    // option ? this.props.handleAddOption(option) : console.log('No option');

    this.setState(() => ({ error: error }));

    if (!error) {
      // clear the input
      event.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" ref={el => this.inputTitle = el} />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}


ReactDOM.render(<ReactApp options={['Option One', 'Option Two']} />, document.getElementById('app'));
