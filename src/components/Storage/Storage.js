import './Storage.css';

function Storage(props) {
  const findGoodById = (id) => {
    return props.goods.find((item) => {
      return item.id === id;
    }).title;
  }
  return (
    <div>
      {props.storage.map((item) => {
        return (
          <span>{item.id}. {findGoodById(item.id)} {item.qty} шт.<br/></span>
        )
      })}
    </div>
  );
}

export default Storage;
