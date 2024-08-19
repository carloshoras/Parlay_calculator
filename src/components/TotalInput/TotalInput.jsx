import './TotalInput.css'; // Estilos específicos para el componente

function TotalInput(props) {
  return (
    <div className="total-input-container">
      <label htmlFor="totalInput" className="total-input-label">Dinero Total</label>
      <input
        type="number"
        id="totalInput"
        className="total-input"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Introduce el dinero total"
        min="0"
      />
    </div>
  );
}

export default TotalInput;
