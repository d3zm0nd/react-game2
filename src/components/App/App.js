import './App.scss';

import React, { useState } from 'react';
import Cities from '../Cities/Cities';
import CityStorage from '../CityStorage/CityStorage';
import Storage from '../Storage/Storage';
import Transportation from '../Transportation/Transportation';
import Stats from '../Stats/Stats';

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
        {
          id: 3,
          qty: 204,
        },
        {
          id: 4,
          qty: 200,
        },
        {
          id: 5,
          qty: 120,
        },
        {
          id: 6,
          qty: 10,
        },
        {
          id: 7,
          qty: 2,
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
  const [money, setMoney] = useState(1000);
  const [days, setDays] = useState(1);
  const [selectedGood, setSelectedGood] = useState(1)

  const goods = [
    {
      id: 1,
      title: "Пиво",
    },
    {
      id: 2,
      title: "Молоко",
    },
    {
      id: 3,
      title: "Пшеница",
    },
    {
      id: 4,
      title: "Грибы",
    },
    {
      id: 5,
      title: "Клевер",
    },
    {
      id: 6,
      title: "Лук",
    },
    {
      id: 7,
      title: "Виноград",
    },
    {
      id: 8,
      title: "Орехи",
    },
    {
      id: 9,
      title: "Вилы",
    },
    {
      id: 10,
      title: "Доски",
    },
    {
      id: 11,
      title: "Коса",
    },
    {
      id: 12,
      title: "Лопата",
    },
    {
      id: 13,
      title: "Топор",
    },
    {
      id: 14,
      title: "Кирка",
    },
  ];

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
      }
    }

    setStorages(storages);
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
