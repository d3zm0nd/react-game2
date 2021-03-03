import './App.scss';

import React, { useState } from 'react';
import Cities from '../Cities/Cities';
import CityStorage from '../CityStorage/CityStorage';
import Storage from '../Storage/Storage';
import Transportation from '../Transportation/Transportation';

function App() {
  const [currentCity, setCurrentCity] = useState(1);
  const [storages, setStorages] = useState([
    {
      cityId: 1,
      storage: [
        {
          id: 1,
          qty: 10,
        },
        {
          id: 2,
          qty: 20,
        },
      ],
    },
    {
      cityId: 2,
      storage: [
        {
          id: 1,
          qty: 5,
        },
      ],
    },
  ]);

  const goods = [
    {
      id: 1,
      title: "Камень",
    },
    {
      id: 2,
      title: "Дерево",
    },
  ];

  const getStorageByCity = () => {
    const store = storages.find((storage) => {
      return storage.cityId === currentCity;
    });
    if (store) {
      return store.storage;
    } else {
      return [];
    }
  }

  return (
    <div className="app">
      <h1 className="app-name">
        Спекулянт
      </h1>

      <Cities
        currentCity={currentCity}
        onChange={(city) => {
          setCurrentCity(city);
        }} />

      <div className="content">
        <div className="column">
          <div className="storage">
            <Storage currentCity={currentCity} storage={getStorageByCity()} goods={goods}/>
          </div>
          <div className="transportation">
            <Transportation />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;