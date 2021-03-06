import './Cities.scss';

function Cities(props) {
  const cities = [
    {
      id: 1,
      title: 'Город 11'
    },
    {
      id: 2,
      title: 'Город 2'
    }
    ,
    {
      id: 3,
      title: 'Город 3'
    }
  ];

  return (
    <div className="cities-list">
      {
        cities.map((city) => {
          return (
            <a className={"city " + (props.currentCity === city.id ? 'active' : '')}
              key={city.id}
              onClick={() => {
                props.onChange(city.id);
              }}
              href='#'>
              {city.title}
            </a>
          )
        })
      }
    </div>
  );
}

export default Cities;

