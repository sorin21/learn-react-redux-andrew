'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactApp = function (_React$Component) {
  _inherits(ReactApp, _React$Component);

  function ReactApp(props) {
    _classCallCheck(this, ReactApp);

    var _this = _possibleConstructorReturn(this, (ReactApp.__proto__ || Object.getPrototypeOf(ReactApp)).call(this, props));

    _this.state = {
      options: props.options
    };
    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.handlePick = _this.handlePick.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
    return _this;
  }

  _createClass(ReactApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var parseOptions = JSON.parse(json);

        if (parseOptions) {
          this.setState(function () {
            return { options: parseOptions };
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
        // console.log('componentDidUpdate saving data', parseJSON);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('componentWillUnmount');
    }
  }, {
    key: 'handleDeleteOptions',
    value: function handleDeleteOptions() {
      this.setState(function () {
        return { options: [] };
      });
      // this.setState(() => {
      //   return {
      //     options: []
      //   }
      // })
    }
  }, {
    key: 'handleDeleteOption',
    value: function handleDeleteOption(optionToRemove) {
      this.setState(function (prevState) {
        return {
          // filter will add the option if we return true
          // and will delete option if we return false
          options: prevState.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      console.log('handlePick', this.state.options[Math.floor(Math.random() * this.state.options.length)]);
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(option) {
      // if there is an empty string
      if (!option) {
        return 'Enter a valid value';
        // if option already exists in the aray
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }

      this.setState(function (prevState) {
        return { options: prevState.options.concat(option) };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var subtitle = 'Decide what you want to do with ReactJS.';

      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: this.state.options.length > 0,
          handlePick: this.handlePick }),
        React.createElement(Options, {
          options: this.state.options,
          handleDeleteOptions: this.handleDeleteOptions,
          handleDeleteOption: this.handleDeleteOption }),
        React.createElement(AddOptions, {
          handleAddOption: this.handleAddOption })
      );
    }
  }]);

  return ReactApp;
}(React.Component);

ReactApp.defaultProps = {
  options: []
};

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: 'React App'
};

var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: props.handlePick,
        disabled: !props.hasOptions },
      'What should I do?'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    props.options.length === 0 && React.createElement(
      'p',
      null,
      ' Please add an option to start!'
    ),
    props.options.map(function (option, index) {
      return React.createElement(Option, {
        key: index,
        optionText: option,
        handleDeleteOption: props.handleDeleteOption });
    }),
    React.createElement(
      'button',
      { onClick: props.handleDeleteOptions },
      'Remove All'
    )
  );
};

var Option = function Option(props) {
  return React.createElement(
    'div',
    null,
    props.optionText,
    React.createElement(
      'button',
      {
        onClick: function onClick(event) {
          return props.handleDeleteOption(props.optionText);
        } },
      ' remove'
    )
  );
};

var AddOptions = function (_React$Component2) {
  _inherits(AddOptions, _React$Component2);

  function AddOptions(props) {
    _classCallCheck(this, AddOptions);

    var _this2 = _possibleConstructorReturn(this, (AddOptions.__proto__ || Object.getPrototypeOf(AddOptions)).call(this, props));

    _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
    _this2.state = {
      // no error
      error: undefined
    };
    return _this2;
  }

  // submit handler method


  _createClass(AddOptions, [{
    key: 'handleAddOption',
    value: function handleAddOption(event) {
      event.preventDefault();

      var option = event.target.elements.option.value.trim();
      // handleAddOption() passed down from parent
      // and send back to parent the option
      // if an error comes back
      var error = this.props.handleAddOption(option);
      // option ? this.props.handleAddOption(option) : console.log('No option');

      this.setState(function () {
        return { error: error };
      });

      if (!error) {
        // clear the input
        event.target.elements.option.value = '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddOption },
          React.createElement('input', { type: 'text', name: 'option', ref: function ref(el) {
              return _this3.inputTitle = el;
            } }),
          React.createElement(
            'button',
            null,
            'Add Option'
          )
        )
      );
    }
  }]);

  return AddOptions;
}(React.Component);

ReactDOM.render(React.createElement(ReactApp, { options: ['Option One', 'Option Two'] }), document.getElementById('app'));