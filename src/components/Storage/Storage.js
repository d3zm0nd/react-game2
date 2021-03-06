import { useState } from 'react';
import './Storage.scss';

function Storage(props) {

  const [qty, setQty] = useState(0);

  const getNameGoodById = (id) => {
    return props.goods.find((item) => {
      return item.id === id;
    }).title;
  }

  const getEmptyCells = (count) => {
    if (count < 8) {
      return Array(8 - count).fill().map(() => {
        return (
          <li className='good-item no-item'></li>
        )
      })
    }
  }

  return (
    <div>
      <h2 className="title">Мой склад</h2>

      <div className="panel">
        <ul className="goods">
          {props.storage.map((item) => {
            return (
              <li
                key={item.id}
                className={`good-item 
                item-${item.id} 
                ${props.selectedGood === item.id ? 'selected' : ''}`}
                onClick={() => {
                  props.onSelectedGood(item.id);
                }}
              >
                <span className="good-description">
                  {item.qty} шт.
                </span>
              </li>
            )
          })}

          {getEmptyCells(props.storage.length)}
        </ul>

        {props.selectedGood ? (
          <div className="sell-panel">
            {getNameGoodById(props.selectedGood)}
            <div className="controls">
              <input type="text"
                className="input"
                value={qty}
                onChange={(ev) => {
                  setQty(parseInt(ev.target.value, 10));
                }}
              ></input> шт.
              <button className="button"
                onClick={() => {
                  props.onSell(props.selectedGood, qty);
                }}>
                Продать
              </button>
            </div>
          </div>
        ) : ''}
      </div>
    </div>
  );
}

export default Storage;
