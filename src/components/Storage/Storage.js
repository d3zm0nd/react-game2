import './Storage.scss';

function Storage(props) {

  const findGoodById = (id) => {
    return props.goods.find((item) => {
      return item.id === id;
    }).title;
  }

  const getEmptyCells = (count) => {
    if (count < 8) {
      return Array(8-count).fill().map(() => {
        return (
          <li className='good-item'></li>
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
              <li className="good-item">
                {findGoodById(item.id)}, {item.qty} шт.</li>
            )
          })}

          {getEmptyCells(props.storage.length)}
        </ul>
      </div>
    </div>
  );
}

export default Storage;
