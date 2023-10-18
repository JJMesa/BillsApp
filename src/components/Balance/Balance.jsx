import { useEffect } from 'react';
import './Balance.module.css';
import PropTypes from 'prop-types';
import style from './Balance.module.css';

export const Balance = ({ balance, setBalance }) => {

  useEffect(() => {
    var initialBalance = parseInt(document.getElementById('balance_base').value);
    setBalance(initialBalance);
  }, []);

  return (
    <div className={style.Container_Balance}>
      <div className={style.Column_Balance}>
        <label>Saldo inicial</label>
        <input name="balance_base" id="balance_base" type="number" defaultValue="10000" onChange={(e) => setBalance(e.target.value)}></input>
      </div>
      <div className={style.Column_Balance}>
        <label>Saldo actual</label>
        <input name="balance" id="balance" type='number' value={balance} readOnly></input>
      </div>
    </div>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  setBalance: PropTypes.func.isRequired
};