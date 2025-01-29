import Calculator from './Calculator';
import HistoryManager, { HistoryRecord } from './HistoryManager';
import * as AdvMath from './AdvancedMath';

/**
 * AdvancedCalculator extends the existing Calculator with advanced math operations
 * and stores history in a dedicated HistoryManager instance.
 */
export default class AdvancedCalculator extends Calculator {
    private historyManager: HistoryManager;

    constructor() {
        super();
        this.historyManager = new HistoryManager();
    }

    /**
     * Example method for advanced math operation, e.g. factorial.
     * We store the result in `onDisplay` so it’s visible (similar to how Calculator
     * updates `onDisplay`), and also track it in the history.
     */
    public factorial(): number {
        if (this.onDisplay === null) {
            throw new Error('No number on display to compute factorial');
        }

        const num = parseFloat(this.onDisplay);
        const result = AdvMath.factorial(num);
        this.onDisplay = result.toString();
        this.fireDisplayUpdateHandlers();

        // Store to history
        const record: HistoryRecord = {
            operationName: 'factorial',
            leftOperand: num,
            rightOperand: NaN, // or 1, or whichever placeholder
            result: result,
        };
        this.historyManager.addRecord(record);

        return result;
    }

    /**
     * Similarly, for other advanced operations like sqrt, sin, cos, tan, etc.
     */
    public sqrt(): number {
        if (this.onDisplay === null) {
            throw new Error('No number on display to compute sqrt');
        }
        const num = parseFloat(this.onDisplay);
        const result = AdvMath.sqrt(num);

        this.onDisplay = result.toString();
        this.fireDisplayUpdateHandlers();

        const record: HistoryRecord = {
            operationName: 'sqrt',
            leftOperand: num,
            rightOperand: NaN,
            result: result,
        };
        this.historyManager.addRecord(record);

        return result;
    }

    // Add similar methods for sin, cos, tan, etc.

    /**
     * Expose methods to manage or retrieve the advanced history:
     */
    public getHistory(): HistoryRecord[] {
        return this.historyManager.getAllHistory();
    }

    public undo(): HistoryRecord | null {
        return this.historyManager.undoLastOperation();
    }

    public clearHistory(): void {
        this.historyManager.clearHistory();
    }
}