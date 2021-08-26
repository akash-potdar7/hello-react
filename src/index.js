import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

/*
Example - React.createElement
ReactDOM.render(
  // <App />,
  React.createElement('div', { obj: {joe: 'do'} }, React.createElement('h1', { style: {color: 'red'} }, 'Hello!')),
  document.getElementById('root')
);
*/

/*
let city1 = 'Sydney',
a = 5,
b = 6;
// JSX

ReactDOM.render(
  <ul>
    {
      a+b > 10 ? <li className='testClassName'>{city1}</li> : <li>Perth</li>
    }
    <li>Brisbane</li>
    <li>Adelaide</li>
    <li>Tasmania</li>
  </ul>,
  document.getElementById('root')
);
*/

function CityLister({ cities }) {
  return (
    cities.map((city, i) =>
      <li key = {i} className = {i % 2 === 0 ? 'greenCity' : 'purpleCity'}>
        {city}
      </li>)
  );
}

function CityListerOne({ cities }) {
  let [first, second, third, fourth] = cities;
  return (
    <>
      <li className='greenCity'>{first}</li>
      <li className='purpleCity' >{second}</li>
      <li className='greenCity'>{third}</li>
      <li className='purpleCity'>{fourth}</li>
    </>
  );
}

function CountriesLister({ countries, type, ranking }) {
  let cities = countries.Aus.states.south_wales.cities,
  country = Object.keys(countries)[0];
  return (
    <>
      <h4>
      <span>Country</span>: {country}
      </h4>
      <div>
        <span>Type</span>: <span>{type}</span>
      </div>
      <div>
        <span>Ranking</span>: <span>{ranking}</span>
      </div>
      <div>
        <span>Cites - Array destructered</span>:
        <ul>
          <CityLister cities={cities}/>
        </ul>
      </div>
      <div>
        <span>Cites - Array destructered</span>:
        <ul>
          <CityListerOne cities={cities}/>
        </ul>
      </div>
    </>
  )
};

function Greet({ name }) {
  return <h1>Hello {name} !</h1>;
}

function GitHubUser({ user }) {
  console.log(user);
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch(`https://api.github.com/users/${user}/`)
    .then(res => {
      console.log('res', res);
      if (res.status === 200) {
        setUserData(res);
      }
    })
    .catch(err => {
      console.log('Whoops! ', err)
    });
  }, [userData]);

  if (userData) {
    return (
      <>
        <h3>{user}</h3>
        <p>{JSON.stringify(userData)}</p>
        <p>
          <img src={userData.avatar_url} width={100}/>
        </p>
      </>
    );
  }
  return (<div>No data for <strong>{user}</strong></div>);
}

let countries = {
  'Aus': {
    states: {
      south_wales: {
        cities: [
          'Sydney', 'Brisbane', 'Adelaide', 'Perth'
        ]
      }
    }
  }
};

function MyApp() {
  const OFFLINE = 'Offline',
  ONLINE = 'Online';
  const [ status, setStatus ] = useState(OFFLINE);
  const [ tasks, setTasks ] = useState(0);
  const [ mood, setMood ] = useState('');

  // Called after the Component renders, which also means after setState.
  useEffect(() => {
    console.log('in useEffect - status : ', status);
  }, [status]);

  useEffect(() => {
    console.log('in useEffect - mood : ', mood, 'tasks', tasks);
  }, [tasks, mood]);

  function onStatusChange() {
    setStatus(status === ONLINE ? OFFLINE : ONLINE);
  };

  function onTaskAdd() {
    let incre = tasks + 1
    let value = ONLINE === status ? incre : 0;
    setTasks(value);
  };

  function onTaskCut() {
    let decre = tasks - 1;
    let value = decre <= 0 ? 0 : decre;
    setTasks(value);
  };

  return (
    <React.Fragment>
      <Greet name = "Akash"/>
      <p>
        Status : {status}
      </p>
      <p>
        What's on your mind : {mood}
      </p>
      <p>
        Tasks : {tasks}
      </p>
      <button onClick={onStatusChange}>
        Change Status
      </button>
      <button onClick={onTaskAdd}>
        Add tasks
      </button>
      <button onClick={onTaskCut}>
        Cut tasks
      </button>
      <div>
        Set mood: <input onChange = { e => setMood(e.target.value) }/> 
      </div>
      <CountriesLister countries={countries} type="Island" ranking={7} />
      <GitHubUser user = "akash-potdar7"/>
    </React.Fragment>
  );
}

ReactDOM.render(
  <><MyApp /></>,
  // <></> === <React.Fragment><React.Fragment/>
  document.getElementById('root')
);
