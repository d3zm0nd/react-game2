import './App.scss';

import React, { useEffect, useState } from 'react';
import Cities from '../Cities/Cities';
import CityStorage from '../CityStorage/CityStorage';
import Storage from '../Storage/Storage';
import Transportation from '../Transportation/Transportation';
import Stats from '../Stats/Stats';
import { storagesData, goodsData, cityStoragesData } from '../../data';

function App() {
  const [currentCity, setCurrentCity] = useState(1);
  const [storages, setStorages] = useState(storagesData);
  const [cityStorages, setCityStorages] = useState(cityStoragesData);
  const [money, setMoney] = useState(1000);
  const [days, setDays] = useState(1);
  const [selectedGood, setSelectedGood] = useState(1);

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

  const findGoodsByCity = (storagesData, city) => {
    const store = storagesData.find((storage) => {
      return storage.cityId === city;
    });
    if (store) {
      return store.goods;
    } else {
      return [];
    }
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const updateCityStorages = () => {
    for (let cityIndex = 0; cityIndex < cityStorages.length; cityIndex++) {
      const storage = cityStorages[cityIndex];

      for (let goodIndex = 0; goodIndex < storage.goods.length; goodIndex++) {
        const goodData = storage.goods[goodIndex];
        const sing = getRandomInt(2) ? 1 : -1;
        const diff = getRandomInt(goodData.maxStep);

        let newPrice = goodData.priceStats.slice(-1).pop() + diff * sing;

        if (newPrice > goodData.maxPrice) {
          newPrice = goodData.maxPrice;
        }

        if (newPrice < goodData.minPrice) {
          newPrice = goodData.minPrice;
        }

        for (let i = 0; i < goodData.priceStats.length - 1; i++) {
          goodData.priceStats[i] = goodData.priceStats[i + 1];
        }

        goodData.priceStats[goodData.priceStats.length - 1] = newPrice;
      }
    }

    setCityStorages(cityStorages);
  }

  const buyGoods = (qty, good) => {
    const totalPrice = qty * good.priceStats[good.priceStats.length - 1];

    if (money >= totalPrice) {
      const cityStorage = storages.find((storage) => {
        return storage.cityId === currentCity;
      });

      if (cityStorage) {
        const currentGood = cityStorage.goods.find((goodStorage) => {
          return goodStorage.id === good.id;
        });

        if (currentGood) {
          currentGood.qty += qty;
          setStorages(storages);
        }
        else {
          cityStorage.goods.push({
            id: good.id,
            qty: qty
          });
        }

        setMoney(money - totalPrice)
      }
    }
  }

  const liveProcess = () => {
    setInterval(() => {
      updateCityStorages();
      setDays((days) => days + 1);
    }, 5000);
  }

  useEffect(() => {
    liveProcess()
  }, []);

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
              storage={findGoodsByCity(storages, currentCity)}
              selectedGood={selectedGood}
              goods={goodsData}
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
            <CityStorage
              storage={findGoodsByCity(cityStorages, currentCity)}
              onBuy={(qty, good) => {
                buyGoods(qty, good);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
