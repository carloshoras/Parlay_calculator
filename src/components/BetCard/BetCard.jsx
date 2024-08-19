import './BetCard.css';

function BetCard(props) {
  return (
    <div className="bet-card">
      <div className="bet-card-details">
        {props.lines.map((line, index) => (
          <div key={index} className="bet-line">
            <span className="line-name">{line.lineName} - </span>
            <span className="line-option">{line.option} - </span>
            <span className="line-odds">Cuota: {line.odds}</span>
          </div>
        ))}
      </div>
      <div className="bet-card-summary">
        <div className="bet-total-odds">
          <strong>Cuota total:</strong> {props.totalOdds}
        </div>
        <div className="bet-amount">
          <strong>Dinero a apostar:</strong> {props.betAmount}€
        </div>
      </div>
    </div>
  );
}

export default BetCard;
