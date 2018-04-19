import React, { Component } from 'react';


export default class AddOptions extends React.Component {
  state = {
    // no error
    error: undefined
  }
  // constructor(props) {
  //   super(props);
  //   this.handleAddOption = this.handleAddOption.bind(this);
  //   this.state = {
  //     // no error
  //     error: undefined
  //   }
  // }

  // submit handler method
  handleAddOption = (event) => {
    event.preventDefault();

    let option = event.target.elements.option.value.trim();
    // handleAddOption() passed down from parent
    // and send back to parent the option
    // if an error comes back
    const error = this.props.handleAddOption(option);
    // option ? this.props.handleAddOption(option) : console.log('No option');
    console.log('testing');
    this.setState(() => ({ error: error }));

    if (!error) {
      // clear the input
      event.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" ref={el => this.inputTitle = el} />
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}

