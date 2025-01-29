import { expect } from 'chai';
import 'mocha';
import HistoryManager, { HistoryRecord } from '../src/modules/HistoryManager';

describe('HistoryManager', () => {
    let historyManager: HistoryManager;

    beforeEach(() => {
        historyManager = new HistoryManager();
    });

    it('should add a record and retrieve it', () => {
        const record: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        historyManager.addRecord(record);

        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(1);
        expect(allHistory[0]).to.deep.equal(record);
    });

    it('should return correct operation summary', () => {
        const record1: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2: HistoryRecord = {
            operationName: 'add',
            leftOperand: 5,
            rightOperand: 3,
            result: 8,
        };
        const record3: HistoryRecord = {
            operationName: 'subtract',
            leftOperand: 5,
            rightOperand: 3,
            result: 2,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
        historyManager.addRecord(record3);
    
        const summary = historyManager.getOperationSummary();
        expect(summary).to.deep.equal({ add: 2, subtract: 1 });
    });


    it('should return records within result range', () => {
        const record1: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2: HistoryRecord = {
            operationName: 'subtract',
            leftOperand: 5,
            rightOperand: 3,
            result: 2,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const recordsInRange = historyManager.getRecordsByResultRange(1, 4);
        expect(recordsInRange).to.have.lengthOf(1);
        expect(recordsInRange[0]).to.deep.equal(record2);
    });


    it('should throw error on non-array JSON import', () => {
        const invalidJson = '{"operationName": "add", "leftOperand": 2, "rightOperand": 3, "result": 5}';
        expect(() => historyManager.importHistory(invalidJson)).to.throw('Failed to import history: JSON data is not an array of records.');
    });


    it('should import valid JSON data', () => {
        const validJson = JSON.stringify([
            { operationName: 'add', leftOperand: 2, rightOperand: 3, result: 5 },
            { operationName: 'subtract', leftOperand: 5, rightOperand: 3, result: 2 }
        ]);
        historyManager.importHistory(validJson);
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(2);
        expect(allHistory[0]).to.deep.equal({ operationName: 'add', leftOperand: 2, rightOperand: 3, result: 5 });
        expect(allHistory[1]).to.deep.equal({ operationName: 'subtract', leftOperand: 5, rightOperand: 3, result: 2 });
    });


    it('should search history by operation name', () => {
        const record1: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2: HistoryRecord = {
            operationName: 'subtract',
            leftOperand: 5,
            rightOperand: 3,
            result: 2,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const searchResults = historyManager.searchHistoryByOperationName('add');
        expect(searchResults).to.have.lengthOf(1);
        expect(searchResults[0]).to.deep.equal(record1);
    });


    it('should export history as JSON string', () => {
        const record: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        historyManager.addRecord(record);
    
        const exportedHistory = historyManager.exportHistory();
        expect(exportedHistory).to.equal(JSON.stringify([record]));
    });


    it('should undo last operation when history is not empty', () => {
        const record1: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2: HistoryRecord = {
            operationName: 'subtract',
            leftOperand: 5,
            rightOperand: 3,
            result: 2,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const undoneRecord = historyManager.undoLastOperation();
        expect(undoneRecord).to.deep.equal(record2);
    
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(1);
        expect(allHistory[0]).to.deep.equal(record1);
    });


    it('should return last record when history is not empty', () => {
        const record1: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        const record2: HistoryRecord = {
            operationName: 'subtract',
            leftOperand: 5,
            rightOperand: 3,
            result: 2,
        };
        historyManager.addRecord(record1);
        historyManager.addRecord(record2);
    
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.deep.equal(record2);
    });


    it('should clear all history records', () => {
        const record: HistoryRecord = {
            operationName: 'add',
            leftOperand: 2,
            rightOperand: 3,
            result: 5,
        };
        historyManager.addRecord(record);
        historyManager.clearHistory();
        const allHistory = historyManager.getAllHistory();
        expect(allHistory).to.have.lengthOf(0);
    });


    it('should return null on undo when history is empty', () => {
        const undoneRecord = historyManager.undoLastOperation();
        expect(undoneRecord).to.be.null;
    });


    it('should return null when history is empty', () => {
        const lastRecord = historyManager.getLastRecord();
        expect(lastRecord).to.be.null;
    });



});