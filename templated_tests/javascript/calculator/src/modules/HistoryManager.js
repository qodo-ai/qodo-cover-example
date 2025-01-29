/**
 * HistoryManager.js
 * 
 * Manages a list of calculation history entries (operations, operands, results).
 * Provides methods for retrieving, clearing, undoing, etc.
 */

class HistoryManager {
    constructor() {
        this.history = [];
    }

    addRecord(record) {
        this.history.push(record);
    }

    getAllHistory() {
        return [...this.history];
    }

    getLastRecord() {
        if (this.history.length === 0) {
            return null;
        }
        return this.history[this.history.length - 1];
    }

    undoLastOperation() {
        if (this.history.length === 0) {
            return null;
        }
        return this.history.pop() || null;
    }

    clearHistory() {
        this.history = [];
    }

    exportHistory() {
        return JSON.stringify(this.history);
    }

    searchHistoryByOperationName(operationName) {
        return this.history.filter(
            (record) => record.operationName === operationName
        );
    }

    getRecordsByResultRange(min, max) {
        return this.history.filter(
            (record) => record.result >= min && record.result <= max
        );
    }

    importHistory(jsonString) {
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

    getOperationSummary() {
        const summary = {};
        for (const record of this.history) {
            if (!summary[record.operationName]) {
                summary[record.operationName] = 0;
            }
            summary[record.operationName]++;
        }
        return summary;
    }
}

export default HistoryManager;