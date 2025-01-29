import Calculator from './Calculator.js';
import HistoryManager from './HistoryManager.js';
import * as AdvMath from './AdvancedMath.js';

/**
 * AdvancedCalculator extends the existing Calculator with advanced math operations
 * and stores history in a dedicated HistoryManager instance.
 */
class AdvancedCalculator extends Calculator {
    constructor() {
        super();
        this.historyManager = new HistoryManager();
    }

    factorial() {
        if (this.onDisplay === null) {
            throw new Error('No number on display to compute factorial');
        }

        const num = parseFloat(this.onDisplay);
        const result = AdvMath.factorial(num);
        this.onDisplay = result.toString();
        this.fireDisplayUpdateHandlers();

        // Store to history
        const record = {
            operationName: 'factorial',
            leftOperand: num,
            rightOperand: NaN,
            result: result,
        };
        this.historyManager.addRecord(record);

        return result;
    }

    sqrt() {
        if (this.onDisplay === null) {
            throw new Error('No number on display to compute sqrt');
        }
        const num = parseFloat(this.onDisplay);
        const result = AdvMath.sqrt(num);

        this.onDisplay = result.toString();
        this.fireDisplayUpdateHandlers();

        const record = {
            operationName: 'sqrt',
            leftOperand: num,
            rightOperand: NaN,
            result: result,
        };
        this.historyManager.addRecord(record);

        return result;
    }

    getHistory() {
        return this.historyManager.getAllHistory();
    }

    undo() {
        return this.historyManager.undoLastOperation();
    }

    clearHistory() {
        this.historyManager.clearHistory();
    }
}

export default AdvancedCalculator;