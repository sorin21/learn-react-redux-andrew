const username = "Dan"
const user = {
  name: 'Sorin',
  age: 20,
  location: 'New Hampshire'
}

function getLocation(location) {
  return location ? <p>Location: {location}</p> : <p>Location unknown</p>;
}

const templateTwo = (
  <div>
    <h1>{user.name}</h1>
    {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
    {getLocation(user.location)}
  </div>
);