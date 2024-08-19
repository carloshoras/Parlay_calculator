import React, { useState } from 'react';
import './LineForm.css'; // Estilos específicos para el componente

function LineForm(props) {
  const [lineName, setLineName] = useState(props.lineName || '');
  const [options, setOptions] = useState(props.options || [{ option: '', odds: '' }]);

  const handleOptionChange = (index, field, value) => {
    const newOptions = options.slice();
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { option: '', odds: '' }]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.slice();
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    props.onSave({ lineName, options });
    props.onClose();
  };

  return (
    <div className={`line-form-modal ${props.isOpen ? 'open' : ''}`}>
      <div className="line-form-content">
        <h2>{props.editing ? 'Editar Línea' : 'Añadir Línea'}</h2>
        <label htmlFor="lineName">Nombre Línea</label>
        <input
          type="text"
          id="lineName"
          value={lineName}
          onChange={(e) => setLineName(e.target.value)}
          placeholder="Ej: MVP NBA"
        />

        {options.map((option, index) => (
          <div key={index} className="option-group">
            <input
              type="text"
              placeholder={`Opción ${index + 1}`}
              value={option.option}
              onChange={(e) => handleOptionChange(index, 'option', e.target.value)}
            />
            <input
              type="number"
              placeholder="Cuota"
              value={option.odds}
              onChange={(e) => handleOptionChange(index, 'odds', e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveOption(index)}>Eliminar Opción</button>
          </div>
        ))}

        <button type="button" onClick={handleAddOption}>Añadir otra opción</button>
        <button type="button" onClick={handleSubmit}>Listo</button>
        <button type="button" onClick={props.onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default LineForm;
