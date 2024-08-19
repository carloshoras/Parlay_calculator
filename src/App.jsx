// src/pages/Home.jsx
import React, { useState } from 'react';
import TotalInput from './components/TotalInput/TotalInput';
import LineItem from './components/LineItem/LineItem';
import LineForm from './components/LineForm/LineForm';
import BetCard from './components/BetCard/BetCard';


function Home() {
  const [totalMoney, setTotalMoney] = useState('');
  const [lines, setLines] = useState([]);  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);

  const handleEditLine = (index) => {
    setCurrentLine({ ...lines[index], index });
    setIsFormOpen(true);
  };

  const handleDeleteLine = (index) => {
    const updatedLines = lines.filter((_, i) => i !== index);
    setLines(updatedLines);
  };

  const handleSaveLine = (newLine) => {
    if (currentLine && currentLine.index !== undefined) {
      const updatedLines = lines.slice();
      updatedLines[currentLine.index] = newLine;
      setLines(updatedLines);
    } else {
      setLines([...lines, newLine]);
    }
  };

  const handleAddLine = () => {
    setCurrentLine(null);
    setIsFormOpen(true);
  };

  const getCombinations = (lines) => {
    if (lines.length === 0) return [];
  
    return lines.reduce((acc, line) => {
      const newCombinations = [];
      line.options.forEach(option => {
        if (acc.length === 0) {
          newCombinations.push([{ ...option, lineName: line.lineName }]);
        } else {
          acc.forEach(combination => {
            newCombinations.push([...combination, { ...option, lineName: line.lineName }]);
          });
        }
      });
      return newCombinations;
    }, []);
  };

  const calculateBetAmounts = (combinations, totalMoney) => {
    const totalInverseOdds = combinations.reduce((sum, combination) => {
      const totalOdds = combination.reduce((prod, option) => prod * option.odds, 1);
      return sum + (1 / totalOdds);
    }, 0);
    
    return combinations.map(combination => {
      const totalOdds = combination.reduce((prod, option) => prod * option.odds, 1);
      const proportion = (1 / totalOdds) / totalInverseOdds;
      return {
        lines: combination,
        totalOdds,
        betAmount: proportion * totalMoney
      };
    });
  };

  const betCombinations = calculateBetAmounts(getCombinations(lines), totalMoney);

  return (
    <div>
      <h1>Calculadora de Apuestas Combinadas</h1>
      <TotalInput value={totalMoney} onChange={setTotalMoney} />
      
      <div className="lines-container">
        {lines.map((line, index) => (
          <LineItem
            key={index}
            lineName={line.lineName}
            numSelections={line.options.length}
            onEdit={() => handleEditLine(index)}
            onDelete={() => handleDeleteLine(index)}
          />
        ))}
      </div>

      <button onClick={handleAddLine}>Añadir Línea</button>

      {isFormOpen ? <LineForm
        isOpen={isFormOpen}
        lineName={currentLine ? currentLine.lineName : ''}
        options={currentLine ? currentLine.options : undefined}
        onSave={handleSaveLine}
        onClose={() => setIsFormOpen(false)}
        editing={currentLine !== null}
      /> : ''}
<h3>Número de apuestas: {betCombinations.length}</h3>
<div className="bet-cards-container">
        {betCombinations.map((combination, index) => (
          <BetCard
            key={index}
            lines={combination.lines}
            totalOdds={combination.totalOdds.toFixed(2)}
            betAmount={combination.betAmount.toFixed(2)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
