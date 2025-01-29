// Math operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;
const power = (a, b) => Math.pow(a, b);

// map symbols to math operations
const operations = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "^": power,
};

class Calculator {
  constructor() {
    this.history = [];
    this.onDisplayUpdateHandlers = [];
    this.clear();
  }

  fireDisplayUpdateHandlers = () => {
    this.onDisplayUpdateHandlers.forEach((func) => func(this.onDisplay));
  };

  onDisplayUpdate = (func) => {
    this.onDisplayUpdateHandlers.push(func);
  };

  offDisplayUpdate = (func) => {
    const index = this.onDisplayUpdateHandlers.indexOf(func);
    if (index > -1) {
      this.onDisplayUpdateHandlers.splice(index, 1);
      return true;
    }
    return false;
  };

  numberPressed = (btn) => {
    const isNegativeZero = this.onDisplay === "-0";
    if (this.displayShouldClear) {
      this.clear();
      this.displayShouldClear = false;
    }

    if (this.currentOperator && this.onDisplay && !isNegativeZero) {
      this.removeHangingDecimal();

      if (this.currentTotal) {
        const operation = operations[this.lastOperator];
        const result = operation(this.currentTotal, parseFloat(this.onDisplay));
        this.currentTotal = result;
      } else {
        this.currentTotal = parseFloat(this.onDisplay);
      }

      this.onDisplay = null;

      this.lastOperator = this.currentOperator;
      this.currentOperator = null;
    }

    if (this.onDisplay === null || isNegativeZero) {
      this.onDisplay = isNegativeZero ? "-" + btn.value : btn.value;
      this.fireDisplayUpdateHandlers();
      return;
    }

    if (this.onDisplay === "0" && btn.value === "0") {
      return;
    }

    this.onDisplay = this.onDisplay + btn.value;
    this.fireDisplayUpdateHandlers();
    return;
  };

  removeHangingDecimal = () => {
    if (this.onDisplay.indexOf(".") === this.onDisplay.length - 1) {
      this.onDisplay = this.onDisplay.slice(0, this.onDisplay.length - 1);
    }
  };

  evaluate = () => {
    if (!this.currentOperator && !this.lastOperator) return;

    this.removeHangingDecimal();

    let leftNum;
    let rightNum;
    let operation;
    if (this.displayShouldClear) {
      const latestOperation = this.history[this.history.length - 1];
      leftNum = parseFloat(this.onDisplay);
      rightNum = latestOperation.rightNum;
      operation = latestOperation.operation;
    } else {
      leftNum = this.currentTotal;
      rightNum = parseFloat(this.onDisplay);
      operation = operations[this.currentOperator || this.lastOperator];
    }

    const result = operation(leftNum, rightNum);
    this.currentTotal = null;
    this.onDisplay = result.toString();
    this.fireDisplayUpdateHandlers();
    this.displayShouldClear = true;
    this.history.push({
      operation: operation,
      leftNum,
      rightNum,
    });
    return result;
  };

  clear = () => {
    this.onDisplay = null;
    this.fireDisplayUpdateHandlers();
    this.currentTotal = null;
    this.currentOperator = null;
    this.lastOperator = null;
    this.displayShouldClear = true;
  };

  actionPressed = (btn) => {
    switch (btn.value) {
      case "evaluate":
        this.evaluate();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "^":
        this.currentOperator = btn.value;
        this.displayShouldClear = false;
        break;
      case "clear":
        this.clear();
        break;
      case ".":
        if (
          typeof this.onDisplay === "string" &&
          !this.onDisplay.includes(".") &&
          this.onDisplay.length > 0 &&
          !this.displayShouldClear
        ) {
          const newVal = this.onDisplay + ".";
          this.onDisplay = newVal;
          this.fireDisplayUpdateHandlers();
        } else if (this.displayShouldClear || this.onDisplay === null) {
          const newVal = "0.";
          this.onDisplay = newVal;
          this.fireDisplayUpdateHandlers();
          this.displayShouldClear = false;
        }
        break;
      case "switchPolarity":
        if (this.currentOperator && this.onDisplay) {
          this.currentTotal = parseFloat(this.onDisplay);
        }
        if (!this.onDisplay || (this.onDisplay && this.currentOperator)) {
          this.onDisplay = "0";
        }
        if (this.onDisplay.substr(0, 1) === "-") {
          this.onDisplay = this.onDisplay.substr(1, this.onDisplay.length);
        } else {
          this.onDisplay = "-" + this.onDisplay;
        }
        this.displayShouldClear = false;
        this.fireDisplayUpdateHandlers();
        break;
      default:
        break;
    }
  };

  buttonPressed = (btn) => {
    switch (btn.type) {
      case "number":
        this.numberPressed(btn);
        break;
      case "operator":
        this.actionPressed(btn);
        break;
      default:
        throw new Error("Button type not recognized!");
    }
    return;
  };

  pressButtons = (arr) => {
    arr.forEach(this.buttonPressed);
  };
}

export default Calculator;