import './Panel.scss';

function Panel(props) {
  return (
    <div>
      <h2 className="title">{props.title}</h2>
      <div className="panel">
        {props.content()}
      </div>
    </div>
  );
}

export default Panel;
