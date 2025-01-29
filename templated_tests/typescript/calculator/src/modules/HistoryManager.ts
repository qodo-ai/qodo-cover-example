/**
 * HistoryManager.ts
 *
 * Manages a list of calculation history entries (operations, operands, results).
 * Provides methods for retrieving, clearing, undoing, etc.
 */
export interface HistoryRecord {
    // Example shape of a single record
    operationName: string;
    leftOperand: number;
    rightOperand: number;
    result: number;
}

export default class HistoryManager {
    private history: HistoryRecord[];

    constructor() {
        this.history = [];
    }

    public addRecord(record: HistoryRecord): void {
        this.history.push(record);
    }

    public getAllHistory(): HistoryRecord[] {
        return [...this.history];
    }

    public getLastRecord(): HistoryRecord | null {
        if (this.history.length === 0) {
            return null;
        }
        return this.history[this.history.length - 1];
    }

    /**
     * If you want an "undo" concept, you might pop the last record here
     */
    public undoLastOperation(): HistoryRecord | null {
        if (this.history.length === 0) {
            return null;
        }
        return this.history.pop() || null;
    }

    public clearHistory(): void {
        this.history = [];
    }

    public exportHistory(): string {
        return JSON.stringify(this.history);
    }

    public searchHistoryByOperationName(operationName: string): HistoryRecord[] {
        return this.history.filter(
            (record) => record.operationName === operationName
        );
    }

    public getRecordsByResultRange(min: number, max: number): HistoryRecord[] {
        return this.history.filter(
            (record) => record.result >= min && record.result <= max
        );
    }

    public importHistory(jsonString: string): void {
        try {
            const parsedData = JSON.parse(jsonString);
            if (!Array.isArray(parsedData)) {
                throw new Error('JSON data is not an array of records.');
            }

            // Simple validation: each item should have the properties we expect
            parsedData.forEach((item) => {
                if (
                    typeof item.operationName !== 'string' ||
                    typeof item.leftOperand !== 'number' ||
                    typeof item.rightOperand !== 'number' ||
                    typeof item.result !== 'number'
                ) {
                    throw new Error('Invalid record format in JSON data.');
                }
                this.history.push(item);
            });
        } catch (err) {
            throw new Error(`Failed to import history: ${err.message}`);
        }
    }

    public getOperationSummary(): { [operationName: string]: number } {
        const summary: { [operationName: string]: number } = {};
        for (const record of this.history) {
            if (!summary[record.operationName]) {
                summary[record.operationName] = 0;
            }
            summary[record.operationName]++;
        }
        return summary;
    }
}