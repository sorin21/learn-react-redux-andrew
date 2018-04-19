const app = {
  options: []
}

const onFormSubmit = (event) => {
  event.preventDefault();
  const option = event.target.elements.option.value;
  if (option) {
    app.options.push(option);
    // console.log(app.options);
    // console.log(app.options.length);

    // clear the input
    event.target.elements.option.value = '';
    render();
  }
}

const onDeleteArray = () => {
  app.options = [];
  render();
  // console.log('app.options after delete', app.options);
}


const appRoot = document.getElementById('app');

const onMakeDecision = () => {
  // genrate the random nrs, we multiply them by araray length
  // then we round down the result
  const randomNum = Math.floor(Math.random() * app.options.length);
  // instead of taking each index app.options[0], we take by random
  const option = app.options[randomNum]
  console.log(option);
};

const render = () => {
  const template = (
    <div>
      <h1>To Do React</h1>
      <p>This is some info</p>
      <p>{app.options.length > 0 ? 'These are your options' : 'No options'}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do</button>
      <ol>
        {app.options.map((option, index) => {
          return <li key={index}>{option}</li>
        })}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
        <button onClick={onDeleteArray}>Remove All</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

render();

