import './App.scss';

import React, { useState } from 'react';
import Cities from '../Cities/Cities';
import CityStorage from '../CityStorage/CityStorage';
import Storage from '../Storage/Storage';
import Transportation from '../Transportation/Transportation';
import Stats from '../Stats/Stats';
import { storages as storagesData, goods } from '../../data';

function App() {
  const [currentCity, setCurrentCity] = useState(1);
  const [storages, setStorages] = useState(storagesData);
  const [money, setMoney] = useState(1000);
  const [days, setDays] = useState(1);
  const [selectedGood, setSelectedGood] = useState(1)

  const sellGoods = (goodId, qty) => {
    const cityStorage = storages.find((storage) => {
      return storage.cityId === currentCity;
    });

    if (cityStorage) {
      const currentGood = cityStorage.storage.find((good) => {
        return good.id === goodId;
      });

      if (currentGood) {
        currentGood.qty -= qty;
        setMoney(money + qty * 10);
        setStorages(storages);
      }
    }
  }

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

  const liveProcess = () => {
    setTimeout(() => {
      setDays(days + 1);
    }, 5000);
  }

  liveProcess();

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
            <Storage
              currentCity={currentCity}
              storage={getStorageByCity()}
              selectedGood={selectedGood}
              goods={goods}
              onSelectedGood={(goodId) => {
                setSelectedGood(goodId);
              }}
              onSell={(goodIt, qty) => {
                sellGoods(goodIt, qty);
              }}
            />
          </div>
          <div className="transportation">
            <Transportation />
            <Stats
              days={days}
              money={money} />
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
