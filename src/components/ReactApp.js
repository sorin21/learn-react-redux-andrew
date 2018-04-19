import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
// import square from './utils';
import validator from 'validator';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

console.log(validator.isEmail('test@yahoo.com'));


export default class ReactApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };
  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     options: props.options
  //   };
  //   this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
  //   this.handlePick = this.handlePick.bind(this);
  //   this.handleAddOption = this.handleAddOption.bind(this);
  //   this.handleDeleteOption = this.handleDeleteOption.bind(this);
  // }

  componentDidMount () {
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


  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
    // this.setState(() => {
    //   return {
    //     options: []
    //   }
    // })
  }

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      // filter will add the option if we return true
      // and will delete option if we return false
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  }

  handlePick = () => {
    const randomNum =  this.state.options[Math.floor(Math.random() * this.state.options.length)];
    this.setState(() => ({
      selectedOption: randomNum
    }))
  }

  handleAddOption = (option) => {
    // if there is an empty string
    if (!option) {
      return 'Enter a valid value';
      // if option already exists in the aray
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists'
    }

    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  }

  closeModal = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }

  render() {
    const subtitle = 'Decide what you want to do with ReactJS.'

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick} />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption} />
            <AddOption
              handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal 
          selectedOption={this.state.selectedOption}
          closeModal={this.closeModal} />
      </div>
    );
  }
}

// optional to add to state
ReactApp.defaultProps = {
  options: []
}


