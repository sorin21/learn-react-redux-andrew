import React from 'react';
import ReactDOM from 'react-dom';

import ReactApp from './components/ReactApp';
import '../node_modules/normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<ReactApp />, document.getElementById('app'));

// class OldSyntax {
//   constructor() {
//     this.name= 'Sorin'
//     this.getGreeting = this.getGreeting.bind(this);
//   }
//   getGreeting() {
//     return `Hi, my name is ${this.name}`;
//   }
// }

// const oldSyntax = new OldSyntax();
// const getGreeting = oldSyntax.getGreeting;
// console.log(getGreeting());

// class NewSyntax {
//   name = 'Jen';
//   getGreeting = () => {
//     return `Hi, my name is ${this.name}`;
//   }
// }

// const newSyntax = new NewSyntax();
// const newGetGreeting = newSyntax.getGreeting;
// console.log(newGetGreeting());