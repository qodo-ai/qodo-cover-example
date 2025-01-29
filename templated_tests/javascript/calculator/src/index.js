import Calculator from './modules/Calculator.js';
import AdvancedCalculator from './modules/AdvancedCalculator.js';

function init() {
  const display = document.querySelector('p#display');
  const calc = new Calculator();
  const advCalc = new AdvancedCalculator();
  const calcBtns = document.querySelectorAll('.calcButton');

  const handleDisplayUpdate = (val) => {
    display.innerText = val ? val : '0';
  };

  calc.onDisplayUpdate(handleDisplayUpdate);

  const handleBtnClick = (e) => {
    const el = e.currentTarget;
    const {
      value,
      type
    } = el.dataset;
    calc.buttonPressed({
      type,
      value
    });
  };

  calcBtns.forEach(btn => btn.addEventListener('click', handleBtnClick));
}

document.addEventListener('DOMContentLoaded', init);