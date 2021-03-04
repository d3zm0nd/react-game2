import './Storage.scss';

function Storage(props) {

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
              <li key={item.id} className={`good-item item-${item.id}`}>
                <span className="good-description">{item.qty} шт.</span>
              </li>
            )
          })}

          {getEmptyCells(props.storage.length)}
        </ul>
      </div>
    </div>
  );
}

export default Storage;
