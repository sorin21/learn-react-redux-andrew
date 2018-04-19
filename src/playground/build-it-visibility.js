const app = {
  show: false
}

const randomFunny = [
  "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  "So many books, so little time.",
  "You only live once, but if you do it right, once is enough.",
  "A day without sunshine is like, you know, night."
];

const onShowDetails = () => {
  app.show = !app.show;
  render();
}

const render = () => {
 const template = (
   <div>
     <h1>Visibility Toogle</h1>
     <button onClick={onShowDetails}>Show quote</button>
     {app.show ? <p>{randomFunny[Math.floor(Math.random() * randomFunny.length)]}</p> : ''}
   </div>
 );
  ReactDOM.render(template, appRoot);
}

const appRoot = document.getElementById('app');
render();

