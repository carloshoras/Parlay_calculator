import './LineItem.css'; // Estilos específicos para el componente

function LineItem(props) {
  return (
    <div className="line-item-container">
      <span className="line-item-name">{props.lineName}</span>
      <span className="line-item-selections">({props.numSelections} selecciones)</span>
      <button className="line-item-button" onClick={props.onEdit}>Editar</button>
      <button className="line-item-button" onClick={props.onDelete}>Eliminar</button>
    </div>
  );
}

export default LineItem;
