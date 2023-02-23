import React, { Component, useState, useEffect } from 'react';
import Script from './components/Script';
import Home from './components/Home';

const App = () => {
  const [showScript, setShowScript] = useState(false);
  const [actors, setActors] = useState([]);
  const [scriptOption, changeScriptOption] = useState('test');

  const openScript = () => {
    setShowScript(!showScript);
  };

  const changeScript = () => {
    if (scriptOption === 'test') {
      changeScriptOption('twelfthNight');
    } else {
      changeScriptOption('test');
    }
  };

  // get the actor list initially on render
  useEffect(() => {
    fetch('/getActors')
      .then((response) => response.json())
      .then((actorList) => {
        let fullActorList = [...actors];

        actorList.forEach((actorRow) => {
          const fullName = [actorRow.first_name, actorRow.last_name];
          fullActorList.push(fullName);
        });
        setActors(fullActorList);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>Play Reading Assistant</h1>
        <nav>
          <button onClick={openScript}>Open/Close Script</button>
          <button onClick={changeScript}>Change Script</button>
        </nav>
      </header>
      {showScript ? (
        <Script actors={actors} scriptOption={scriptOption} />
      ) : (
        <Home
          setActors={setActors}
          actors={actors}
          key={'Home'}
          scriptOption={scriptOption}
        />
      )}
    </div>
  );
};

export default App;
