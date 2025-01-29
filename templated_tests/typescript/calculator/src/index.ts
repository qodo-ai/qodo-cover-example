import Calculator from './modules/Calculator';
import AdvancedCalculator from './modules/AdvancedCalculator';

declare interface ElementEvent extends Event {
  currentTarget: HTMLElement;
  target: HTMLElement;
}

function init() {

  const display: HTMLParagraphElement = document.querySelector('p#display');
  const calc = new Calculator();
  const advCalc = new AdvancedCalculator(); // Use AdvancedCalculator
  const calcBtns = document.querySelectorAll('.calcButton');

  const handleDisplayUpdate = (val: string) => {
    display.innerText = val ? val : '0'
  };

  calc.onDisplayUpdate(handleDisplayUpdate);

  const handleBtnClick = (e: ElementEvent) => {
    const el = e.currentTarget;
    const {
      value,
      type
    } = el.dataset;
    calc.buttonPressed({
      type,
      value
    })
  }

  calcBtns.forEach(btn => btn.addEventListener('click', handleBtnClick));

}

document.addEventListener('DOMContentLoaded', init);